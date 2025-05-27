// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import google from '../assets/google-b.png';
import apple from '../assets/apple-b.png';

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
  const [form, setForm] = useState({
    email: '',
    password: '',
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
        className="w-full max-w-3xl p-8 rounded"
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
          <div className='flex justify-between font-semibold'>
            <div className='flex gap-2 items-center text-[#F8931F]'>
              <input type="checkbox" className='!bg-[#F8931F]' />
              <p>Keep me logged in</p>
            </div>
            <div className='flex gap-2 items-center text-[#F8931F]'>
              <p className='underline'>Forgot your password?</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Link to='/user_orders' className='w-full flex justify-center'>
            <button
              type="submit"
              className="bg-[#009144] hover:bg-green-700 text-white font-semibold px-14 w-full md:w-[250px] !mx-auto py-2 rounded"
            >
              Log in
            </button>
          </Link>
        </div>

        <div className='flex justify-center gap-2 mt-4'>
          <img src={google} alt="" className='w-[35px] h-[35px]' />
          <img src={apple} alt="" className='w-[35px] h-[35px]'/>
        </div>
        <p className='text-[#009144E5] text-sm font-medium w-fit !mx-auto !mt-4'>New User? <Link to='/user_register'><span className='text-[#009144] font-semibold'>Sign Up</span></Link></p>
      </form>
    </div>
  );
}
