import React, { useState, useContext, useMemo } from 'react'
// import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { signup } from '../services/api'
import { countries, states } from '../services/index'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

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
  
  const countryOptions = useMemo(
    () => countries.map((c) => ({ value: c.name, label: c.name })),
    []
  )

  // Handler when user picks a country
  const handleCountrySelect = (opt) => {
    setForm((f) => ({
      ...f,
      country: opt?.value || null,
      state: '',
    }))
  }

  // Handler when user picks a state
  const handleStateSelect = (opt) => {
    setForm((f) => ({
      ...f,
      state: opt?.value || '',
    }))
  }

  // Text input handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  // Async loader for states
  const loadStateOptions = (inputValue, callback) => {
    // first filter by selected country
    let filtered = states
      .filter((s) => s.country_id === form.country)

    // then text‐search if the user has typed something
    if (inputValue) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    }

    // map into label/value and slice to first 100
    const options = filtered
      .slice(0, 100)
      .map((s) => ({ value: s.name, label: s.name }))

    callback(options)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      const payload = {
        ...form,
        country: countries.find((c) => c.id === form.country).name,
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
            <AsyncSelect
              cacheOptions
              defaultOptions={countryOptions.slice(0, 10)}
              loadOptions={(input, cb) =>
                cb(
                  countryOptions
                    .filter((o) =>
                      o.label.toLowerCase().includes(input.toLowerCase())
                    )
                    .slice(0, 50)
                )
              }
              onChange={handleCountrySelect}
              placeholder="Type to search countries..."
              isClearable
              className="mt-1"
            />
          </div>

          {/* State (react-select) */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select State <span className="text-red-500">*</span>
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions={states
                .filter((s) => s.country_id === form.country)
                .slice(0, 10)
                .map((s) => ({ value: s.name, label: s.name }))}
              loadOptions={loadStateOptions}
              onChange={handleStateSelect}
              placeholder="Type to search states..."
              isClearable
              className="mt-1"
              isDisabled={!form.country}
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