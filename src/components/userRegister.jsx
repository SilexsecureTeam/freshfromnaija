// src/components/SignUp.jsx
import React, { useState } from 'react';
import { signup } from '../services/api'
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const navigate= useNavigate();
  const [form, setForm] = useState({
    lastname: '',
    firstname: '',
    country: '',
    state: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    register_by: 'email',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Generic change handler:
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await signup(form)
      // Response example (from your spec):
      // {
      //   result: true,
      //   message: "Successfully logged in",
      //   access_token: "...",
      //   token_type: "Bearer",
      //   expires_at: null,
      //   user: { id: 15, name: "Caleb Sho", email: "...", ... }
      // }

      if (response.data.result) {
        // Save token somewhere (localStorage / context / redux)
        localStorage.setItem('ffn_token', response.data.access_token)

        // Show a success message
        setSuccessMessage(response.data.message)
        navigate('/user_orders')
      } else {
        setError('Signup failed: ' + response.data.message)
      }
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-8 rounded"
      >
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">New account</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {successMessage && <div className="text-green-600 mb-2">{successMessage}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select Country <span className="text-red-500">*</span>
            </label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select State <span className="text-red-500">*</span>
            </label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+44 1234 5678"
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Confirm password <span className="text-red-500">*</span>
            </label>
            <input
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Hidden/select for "register_by": */}
        <input
          type="hidden"
          name="register_by"
          value={form.register_by}
        />

        <button
          type="submit"
          className="px-10 bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-8 font-semibold"
          disabled={loading}
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
