// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/google-b.png';
import apple from '../assets/apple-b.png';
import { login } from '../services/api';
import { toast } from "react-toastify";  

const countries = [
  { code: 'GB', label: 'England' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'US', label: 'United States' },
  // …add as needed
];

const statesByCountry = {
  GB: ['Birmingham', 'London', 'Manchester'],
  NG: ['Lagos', 'Abuja', 'Kano'],
  US: ['California', 'New York', 'Texas'],
  // …
};

export default function UserLoginBody() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare payload per API spec:
      const payload = {
        email: form.email,
        password: form.password,
        login_by: 'email',
      }

      const response = await login(payload)
      // Sample response format:
      // {
      //   "result": true,
      //   "message": "Successfully logged in",
      //   "access_token": "...",
      //   "token_type": "Bearer",
      //   "expires_at": null,
      //   "user": { id: 15, type: "customer", name: "Caleb Sho", ... }
      // }

      if (response.data.result) {
        // 1) Save the token (and optionally user data) in localStorage / context / redux
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        toast.success('Login Successful')
        // 2) Redirect to another page, e.g. dashboard or orders
        navigate('/user_orders')
      } else {
        // Non-200 response with result: false
        toast.error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err)
      // If the server returned a 4xx/5xx error, show that message if available
      const msg = err?.response?.data?.message || 'An unexpected error occurred'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-3xl p-8 rounded bg-white shadow"
      >
        <h2 className="text-3xl font-bold text-[#333333] !mb-6">Log in</h2>

        <div className="grid grid-cols-1 gap-y-6 gap-x-8">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Email
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
              Password
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

          <div className="flex flex-col md:flex-row justify-between gap-y-4 font-semibold">
            <div className="flex gap-2 items-center text-[#F8931F] w-fit">
              <input type="checkbox" className="bg-[#F8931F]" />
              <p>Keep me logged in</p>
            </div>
            <div className="flex gap-2 items-center text-[#F8931F] w-fit p-0">
              <p className="underline w-fit">Forgot your password?</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#009144] hover:bg-green-700 text-white font-semibold px-14 w-full md:w-[250px] mx-auto py-2 rounded"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <img src={google} alt="Login with Google" className="w-[35px] h-[35px]" />
          <img src={apple} alt="Login with Apple" className="w-[35px] h-[35px]" />
        </div>

        <p className="text-[#009144E5] text-sm font-medium mx-auto mt-4 w-fit">
          New User?{' '}
          <Link to="/user_register" className="text-[#009144] font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}