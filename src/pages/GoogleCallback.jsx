// src/pages/GoogleCallback.jsx
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function GoogleCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const finalizeGoogleLogin = async () => {
      try {
       // Hit the CALLBACK endpoint that actually returns JSON:
       const response = await axios.get(
         'https://api.freshfromnaija.com/api/v1/auth/social-login/google/callback'
       )

        if (response.data.result) {
          const { access_token, user } = response.data

          localStorage.setItem('token', access_token)
          localStorage.setItem('user', JSON.stringify(user))
          toast.success('Google login successful')
          navigate('/user_orders')
        } else {
          toast.error(response.data.message || 'Google login failed')
          navigate('/user_login')
        }
      } catch (err) {
        console.error('Error finalizing Google login:', err)
        const msg =
          err?.response?.data?.message || 'Google login error'
        toast.error(msg)
        navigate('/user_login')
      }
    }

    finalizeGoogleLogin()
  }, [navigate])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700">Processing Google login…</p>
    </div>
  )
}
