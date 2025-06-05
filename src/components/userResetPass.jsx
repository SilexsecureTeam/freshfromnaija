// src/pages/ResetPasswordPage.jsx
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { confirmPasswordReset, resendPasswordCode } from '../services/api'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const storedEmail = localStorage.getItem('reset_email') || ''
  const [emailOrPhone] = useState(storedEmail)

  // OTP as four separate digits
  const [codeDigits, setCodeDigits] = useState(['', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  // Handle entering a digit
  const handleDigitChange = (e, idx) => {
    const val = e.target.value
    if (!/^[0-9]?$/.test(val)) return
    const newDigits = [...codeDigits]
    newDigits[idx] = val
    setCodeDigits(newDigits)
    if (val && idx < 3) {
      inputRefs[idx + 1].current.focus()
    }
  }

  // Handle backspace navigation
  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !codeDigits[idx] && idx > 0) {
      inputRefs[idx - 1].current.focus()
      const newDigits = [...codeDigits]
      newDigits[idx - 1] = ''
      setCodeDigits(newDigits)
    }
  }

  // Handle paste into first box
  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').trim()
    if (!/^\d+$/.test(pasteData)) return
    const pasteDigits = pasteData.split('').slice(0, 4)
    const newDigits = [...codeDigits]
    pasteDigits.forEach((d, i) => {
      newDigits[i] = d
      if (inputRefs[i].current) {
        inputRefs[i].current.value = d
      }
    })
    setCodeDigits(newDigits)
    const nextIndex = pasteDigits.length < 4 ? pasteDigits.length : 3
    inputRefs[nextIndex].current.focus()
  }

  // Handle “Reset Password” form submit
  const handleConfirm = async (e) => {
    e.preventDefault()
    const code = codeDigits.join('')
    if (code.length < 4) {
      setError('Please enter the 4-digit code.')
      return
    }
    if (!newPassword.trim()) {
      setError('Please enter a new password.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await confirmPasswordReset(code, newPassword.trim())
      // Response example: { result: true, message: "Password reset successful" }
      if (response.data.result) {
        toast.success(response.data.message || 'Password has been reset!')
        navigate('/user_login')
      } else {
        setError(response.data.message || 'Failed to reset password.')
      }
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || 'An unexpected error occurred'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // Handle “Resend Code” click
  const handleResendClick = async () => {
    if (!emailOrPhone) return
    setResendLoading(true)
    setError(null)

    try {
      const response = await resendPasswordCode(emailOrPhone)
      if (response.data.result) {
        toast.success(response.data.message || 'Code resent.')
      } else {
        setError(response.data.message || 'Unable to resend code.')
      }
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || 'Error resending code'
      setError(msg)
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">
          Reset Password
        </h2>

        <p className="text-sm !mb-4 text-gray-600">
          We have sent a 4-digit code to <strong>{emailOrPhone}</strong>. Enter it below along with your new password.
        </p>

        {error && <div className="text-red-600 !mb-2">{error}</div>}

        <form onSubmit={handleConfirm} className="!space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#333333] !mb-2">
              Verification Code <span className="text-red-500">*</span>
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
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-14 py-2 rounded"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
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
