import axios from 'axios'


const umeUrl = '/api'

// Function to get the users token
// const getToken = () => {
//   return window.localStorage.getItem('token')
// }

// // Get Header for secure backend routes
// const withHeader = () => {
//   return {
//     headers: {Authorization: `Bearer ${getToken()}`}
//   }
// }

// Register a user
export const register = (data) => {
  return axios.post(`${umeUrl}/users`, data)
}

// Load a user
export const loadUser = () => {
  return axios.get(`${umeUrl}/auth`)
}

// Login user
export const login = (data) => {
  return  axios.post(`${umeUrl}/auth`, data)
}

// Get a user profile
export const getUserProfile = () => {
  return axios.get(`${umeUrl}/profile/me`)
}

// Create a user profile
export const createProfile = (formData) => {
  return axios.post(`${umeUrl}/profile`, formData)
}