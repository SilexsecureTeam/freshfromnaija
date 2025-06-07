// src/pages/UserOtpPage.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { confirmCode, resendCode } from '../services/api'

export default function UserOtpPage() {
  const navigate = useNavigate()

  // 1) Read the saved user object from localStorage (set during signup)
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const userId = user?.id

  // 2) State: store each digit in an array of length 4
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState(null)

  // 3) Refs for each input box to manage focus
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  // Redirect if no userId
  useEffect(() => {
    if (!userId) {
      toast.error('No user found. Please sign up first.')
      navigate('/user_register')
    }
  }, [userId, navigate])

  // Automatically resend code on mount
  useEffect(() => {
    if (userId) {
      sendResendCode()
    }
  }, [userId])

  // Resend code logic
  const sendResendCode = async () => {
    if (!userId) return
    setResendLoading(true)
    setError(null)

    try {
      const response = await resendCode(userId)
      if (response.data.result) {
        toast.success('Verification code has been sent.')
      } else {
        toast.error(response.data.message || 'Unable to send verification code')
      }
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || 'Error sending verification code'
      toast.error(msg)
    } finally {
      setResendLoading(false)
    }
  }

  // Handle individual digit change
  const handleDigitChange = (e, idx) => {
    const val = e.target.value
    if (!/^[0-9]?$/.test(val)) return // allow only single digit or empty

    const newDigits = [...codeDigits]
    newDigits[idx] = val
    setCodeDigits(newDigits)

    // If user typed a digit and it's not the last box, move focus to next
    if (val && idx < inputRefs.length - 1) {
      inputRefs[idx + 1].current.focus()
    }
  }

  // Handle keyDown for backspace to go to previous input
  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !codeDigits[idx] && idx > 0) {
      // If current box is empty and Backspace pressed, move to previous
      inputRefs[idx - 1].current.focus()
      const newDigits = [...codeDigits]
      newDigits[idx - 1] = ''
      setCodeDigits(newDigits)
    }
  }

  // Handle paste: distribute up to 4 digits starting from first box
  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').trim()
    if (!/^\d+$/.test(pasteData)) return // ignore non-digits

    const pasteDigits = pasteData.split('').slice(0, 6)
    const newDigits = [...codeDigits]
    pasteDigits.forEach((d, i) => {
      newDigits[i] = d
      if (inputRefs[i].current) {
        inputRefs[i].current.value = d
      }
    })
    setCodeDigits(newDigits)
    // Focus the box after the last pasted digit (or the last box)
    const nextIndex = pasteDigits.length < 6 ? pasteDigits.length : 5
    inputRefs[nextIndex].current.focus()
  }

  // Confirm code on form submit
  const handleConfirm = async (e) => {
    e.preventDefault()
    const code = codeDigits.join('')
    if (code.length < 6) {
      setError('Please enter the 6-digit verification code.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await confirmCode(userId, code)

      if (response.data.result) {
        toast.success('Email verified successfully!')
        navigate('/user_orders')
      } else {
        setError(response.data.message || 'Invalid code. Please try again.')
        toast.error(error)
      }
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || 'An unexpected error occurred'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // Manual “Resend Code” click
  const handleResendClick = async () => {
    sendResendCode()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">
          Verify Your Email
        </h2>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleConfirm} className="!space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-4">
              Enter Verification Code <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-between gap-2">
              {codeDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  ref={inputRefs[idx]}
                  value={digit}
                  onChange={(e) => handleDigitChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  className="w-13 h-13 text-center text-xl border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-14 py-2 rounded"
          >
            {loading ? 'Verifying…' : 'Confirm Code'}
          </button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">Didn't receive a code?</span>
          <button
            onClick={handleResendClick}
            disabled={resendLoading}
            className="text-green-600 font-medium text-sm hover:underline"
          >
            {resendLoading ? 'Resending…' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  )
}
