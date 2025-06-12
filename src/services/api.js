// src/services/api.js
import axios from 'axios';


// 1) Create a single Axios instance with your base URL:
const apiClient = axios.create({
    baseURL: 'https://api.freshfromnaija.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 2) Export the signup function you already have:
export function signup(userData) {
    return apiClient.post('/auth/signup', userData)
}

// 3) Add the new login function:
export function login(credentials) {
    // credentials should be an object: { email, password, login_by }
    return apiClient.post('/auth/login', credentials)
}

export function logout() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
    // credentials should be an object: { email, password, login_by }
    return apiClient.get('/auth/logout', {
        headers: { Authorization: `Bearer ${token}` },
    });
}


export function resendCode(userId) {
    return apiClient.get('/auth/resend_code', {
        params: {
            user_id: userId,
            register_by: 'email',
        },
    })
}


export function confirmCode(userId, verificationCode) {
    return apiClient.post('/auth/confirm_code', {
        user_id: userId,
        verification_code: verificationCode,
    })
}


export function forgetPasswordRequest(emailOrPhone) {
    return apiClient.post('/auth/password/forget_request', {
      email_or_phone: emailOrPhone,
      send_code_by: 'email',
    })
  }
  
  /**
   * Resend the reset code.
   * POST /auth/password/resend_code
   * body: { email_or_phone, verify_by:"email" }
   */
  export function resendPasswordCode(emailOrPhone) {
    return apiClient.post('/auth/password/resend_code', {
      email_or_phone: emailOrPhone,
      verify_by: 'email',
    })
  }
  
  /**
   * Confirm the reset (OTP + new password).
   * POST /auth/password/confirm_reset
   * body: { verification_code, password }
   */
  export function confirmPasswordReset(verificationCode, newPassword) {
    return apiClient.post('/auth/password/confirm_reset', {
      verification_code: verificationCode,
      password: newPassword,
    })
  }

  export function getUserInfo() {
    const token = localStorage.getItem('token')
    if (!token) {
      return Promise.reject(new Error('No token stored'))
    }
    return apiClient.post('/auth/info', {
      access_token: token,
    })
  }
  
  export function getGoogleSocialLoginUrl() {
    // If you ever change baseURL in axios, update this accordingly.
    return `${apiClient.defaults.baseURL}/auth/social-login/google`
  }

  export function getCountries() {
    return apiClient.get('/countries');
}
  export function getCities() {
    return apiClient.get('/cities');
}

/**
 * Create a new shipping address for the logged in user.
 * POST /auth/user/shipping/create
 */
export function createAddress({ address, country_id, state_id, city_id, postal_code, phone }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const user_id = user.id
    return apiClient.post('/auth/user/shipping/create', {
      user_id,
      address,
      country_id,
      state_id,
      city_id,
      postal_code,
      phone,
    })
  }
  
  /**
   * Get all shipping addresses for the logged in user.
   * GET /auth/user/shipping/address
   */
  export function getAddresses() {
    return apiClient.get('/auth/user/shipping/address')
  }
  
  /**
   * Delete a shipping address by its ID.
   * GET /auth/user/shipping/delete/{id}
   */
  export function deleteAddress(addressId) {
    return apiClient.get(`/auth/user/shipping/delete/${addressId}`)
  }
  
  /**
   * Update which address is in the cart.
   * POST /auth/update-address-in-cart
   */
  export function updateAddressInCart(address_id) {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const user_id = user.id
    return apiClient.post('/auth/update-address-in-cart', {
      user_id,
      address_id,
    })
  }
  
// 4) (Optional) You can add more endpoints here later, e.g.:
// export function fetchProfile(token) {
//   return apiClient.get('/user/profile', {
//     headers: { Authorization: `Bearer ${token}` },
//   })
// }

export default apiClient
