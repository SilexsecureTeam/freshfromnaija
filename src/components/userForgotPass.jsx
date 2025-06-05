// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { forgetPasswordRequest } from '../services/api'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await forgetPasswordRequest(email.trim())
      // Example response: { result: true, message: "A code is sent" }
      if (response.data.result) {
        toast.success(response.data.message || 'Reset code sent.')
        // Save the email so ResetPasswordPage can use it
        localStorage.setItem('reset_email', email.trim())
        navigate('/user_reset_pass')
      } else {
        setError(response.data.message || 'Failed to send reset code.')
      }
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || 'An unexpected error occurred'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">
          Forgot Password
        </h2>

        {error && <div className="text-red-600 !mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="!space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Enter your Email or Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email_or_phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-14 py-2 rounded"
          >
            {loading ? 'Sending…' : 'Send Reset Code'}
          </button>
        </form>
      </div>
    </div>
  )
}
