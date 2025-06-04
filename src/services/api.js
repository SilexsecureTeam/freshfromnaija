// src/services/api.js
import axios from 'axios'

// 1) Create a single Axios instance with your base URL:
const apiClient = axios.create({
  baseURL: 'https://api.freshfromnaija.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2) Export the signup function you already have:
export function signup(userData) {
  return apiClient.post('/auth/signup', userData)
}

// 3) Add the new login function:
export function login(credentials) {
  // credentials should be an object: { email, password, login_by }
  return apiClient.post('/auth/login', credentials)
}

// 4) (Optional) You can add more endpoints here later, e.g.:
// export function fetchProfile(token) {
//   return apiClient.get('/user/profile', {
//     headers: { Authorization: `Bearer ${token}` },
//   })
// }

export default apiClient
