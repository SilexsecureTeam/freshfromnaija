// src/components/SignUp.jsx
import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import { signup } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// ── “Database” of countries & their states ─────────────────────────────
const countryOptions = [
  { value: 'GB', label: 'England' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'US', label: 'United States' },
  // …add more countries here if needed
]

const statesByCountry = {
  GB: ['Birmingham', 'London', 'Manchester'],
  NG: ['Lagos', 'Abuja', 'Kano'],
  US: ['California', 'New York', 'Texas'],
  // …add more mappings here
}

export default function UserRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    lastname: '',
    firstname: '',
    country: '', // will hold e.g. 'NG'
    state: '',   // will hold e.g. 'Lagos'
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    register_by: 'email',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Compute state options based on selected form.country
  const stateOptions = useMemo(() => {
    const arr = statesByCountry[form.country] || []
    return arr.map((s) => ({ value: s, label: s }))
  }, [form.country])

  // Generic change handler for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  // When react-select country changes:
  const handleCountrySelect = (selectedOption) => {
    const newCountry = selectedOption ? selectedOption.value : ''
    setForm((f) => ({
      ...f,
      country: newCountry,
      state: '', // reset state whenever country changes
    }))
  }

  // When react-select state changes:
  const handleStateSelect = (selectedOption) => {
    const newState = selectedOption ? selectedOption.value : ''
    setForm((f) => ({ ...f, state: newState }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simple front-end validation:
    if (!form.country) {
      setError('Please select a country.')
      setLoading(false)
      return
    }
    if (!form.state) {
      setError('Please select a state.')
      setLoading(false)
      return
    }

    try {
      const response = await signup(form)
      if (response.data.result) {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        toast.success(response.data.message)
        navigate('/user_otp')
      } else {
        toast.error('Signup failed: ' + response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl p-8 rounded bg-white shadow">
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">New account</h2>

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
              placeholder='John'
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
              placeholder='Doe'
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Country (react-select) */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select Country <span className="text-red-500">*</span>
            </label>
            <Select
              options={countryOptions}
              placeholder="Choose your country..."
              value={countryOptions.find((opt) => opt.value === form.country) || null}
              onChange={handleCountrySelect}
              isClearable
              className="mt-1"
            />
          </div>

          {/* State (react-select) */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select State <span className="text-red-500">*</span>
            </label>
            <Select
              options={stateOptions}
              placeholder="Choose your state..."
              value={stateOptions.find((opt) => opt.value === form.state) || null}
              onChange={handleStateSelect}
              isClearable
              isDisabled={!form.country}
              className="mt-1"
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

        {/* Hidden “register_by” field */}
        <input type="hidden" name="register_by" value={form.register_by} />

        <button
          type="submit"
          className="px-10 bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-8 font-semibold"
          disabled={loading}
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
        <p className="text-[#009144E5] text-sm font-medium mx-auto !mt-7 w-fit">
          Already have an account?{' '}
          <Link to="/user_login" className="text-[#009144] !font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </div>
  )
}
