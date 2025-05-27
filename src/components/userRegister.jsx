// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const countries = [
  { code: 'GB', label: 'England' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'US', label: 'United States' },
  // …add as needed
];

const statesByCountry = {
  GB: ['Birmingham','London','Manchester'],
  NG: ['Lagos','Abuja','Kano'],
  US: ['California','New York','Texas'],
  // …
};

export default function UserRegister() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: send `form` to your API
    console.log('Submitting:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-8 rounded"
      >
        <h2 className="text-2xl font-bold text-[#333333] !mb-6">New account</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
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
              name="lastName"
              value={form.lastName}
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
            <select
              name="country"
              value={form.country}
              onChange={e => {
                handleChange(e);
                setForm(f => ({ ...f, state: '' }));
              }}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Choose country</option>
              {countries.map(c => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-[#333333]">
              Select State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              disabled={!form.country}
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
            >
              <option value="">Choose state</option>
              {(statesByCountry[form.country] || []).map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
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
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1.5 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="mt-8">
            <Link to='/user_login' className='w-full'>
          <button
            type="submit"
            className="w-full md:w-auto bg-[#009144] hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            Create account
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
