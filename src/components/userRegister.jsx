// src/components/UserRegister.jsx
import React, { useState, useMemo } from 'react'
import AsyncSelect from 'react-select/async'
import { signup } from '../services/api'
import { countries, states } from '../services/index'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function UserRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    country: null,             // will hold numeric country_id
    state: null,               // will hold numeric state_id
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    register_by: 'email',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Build country options once
  const countryOptions = useMemo(
    () => countries.map(c => ({ value: c.id, label: c.name })),
    []
  )

  // --- Handlers ---
  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleCountrySelect = opt => {
    setForm(f => ({
      ...f,
      country: opt?.value || null,
      state: null,    // reset state when country changes
    }))
  }

  const handleStateSelect = opt => {
    setForm(f => ({
      ...f,
      state: opt?.value || null,
    }))
  }

  // --- Async loaders ---
  const loadCountryOptions = (input, callback) => {
    const filtered = countryOptions
      .filter(o => o.label.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 50)
    callback(filtered)
  }

  const loadStateOptions = (input, callback) => {
    if (!form.country) {
      callback([])
      return
    }
    const opts = states
      .filter(s => s.country_id === form.country)
      .filter(s =>
        input
          ? s.name.toLowerCase().includes(input.toLowerCase())
          : true
      )
      .slice(0, 50)
      .map(s => ({ value: s.id, label: s.name }))
    callback(opts)
  }

  // --- Submit ---
  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    if (!form.country) {
      setError('Please select a country.')
      return
    }
    if (!form.state) {
      setError('Please select a state.')
      return
    }

    setLoading(true)
    try {
      // Lookup names
      const countryName = countries.find(c => c.id === form.country)?.name
      const stateName   = states.find(s => s.id === form.state)?.name

      // Prepare final payload with names
      const payload = {
        firstname: form.firstname,
        lastname:  form.lastname,
        country:   countryName,
        state:     stateName,
        phone:     form.phone,
        email:     form.email,
        password:  form.password,
        password_confirmation: form.password_confirmation,
        register_by: 'email',
      }

      const response = await signup(payload)
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
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-8 rounded bg-white shadow"
      >
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">
          New Account
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

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
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select Country <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions={countryOptions.slice(0, 10)}
              loadOptions={loadCountryOptions}
              onChange={handleCountrySelect}
              value={
                countryOptions.find(o => o.value === form.country) ||
                null
              }
              placeholder="Type to search countries..."
              isClearable
              className="mt-1"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select State <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions={states
                .filter(s => s.country_id === form.country)
                .slice(0, 10)
                .map(s => ({ value: s.id, label: s.name }))}
              loadOptions={loadStateOptions}
              onChange={handleStateSelect}
              value={
                form.state
                  ? { value: form.state, label: states.find(s => s.id === form.state).name }
                  : null
              }
              placeholder="Type to search states..."
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
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Hidden */}
        <input
          type="hidden"
          name="register_by"
          value={form.register_by}
        />

        <button
          type="submit"
          className="mt-8 px-10 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
          disabled={loading}
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>

        <p className="text-sm text-[#009144E5] mt-6 text-center">
          Already have an account?{' '}
          <Link to="/user_login" className="text-[#009144] font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </div>
  )
}
