import axios from 'axios'


const umeUrl = '/api'

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