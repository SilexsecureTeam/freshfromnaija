// src/pages/GoogleCallback.jsx
import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function GoogleCallback() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const finalizeGoogleLogin = async () => {
      // 1) Extract “code” from the URL
      const params = new URLSearchParams(location.search)
      const code = params.get('code')
      if (!code) {
        toast.error('No code returned from Google')
        return navigate('/user_login')
      }

      try {
        // 2) Call your backend’s callback endpoint with the code
        //    Adjust path if your backend uses POST or a different URL.
        const { data } = await axios.get(
          'https://api.freshfromnaija.com/api/v1/auth/social-login/google/callback',
          { params: { code } }
        )

        // 3) On success, save token & user → navigate
        if (data.result) {
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('user', JSON.stringify(data.user))
          toast.success('Google login successful')
          navigate('/user_orders')
        } else {
          toast.error(data.message || 'Google login failed')
          navigate('/user_login')
        }
      } catch (err) {
        console.error('Error finalizing Google login:', err)
        const msg = err?.response?.data?.message || 'Google login error'
        toast.error(msg)
        navigate('/user_login')
      }
    }

    finalizeGoogleLogin()
  }, [location.search, navigate])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700">Processing Google login…</p>
    </div>
  )
}
