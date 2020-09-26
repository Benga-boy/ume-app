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

// Get all user profiles
export const getAllProfiles = () => {
  return axios.get(`${umeUrl}/profile`)
}

// Get a single profile
export const getASingleProfile = (id) => {
  return axios.get(`${umeUrl}/profile/user/${id}`)
}

// Get the users Github repos
export const getUserGithubRepos = (username) => {
  return axios.get(`${umeUrl}/profile/github/${username}`)
}

// Follow another users profile
export const followAnotherUser = (id) => {
  return axios.post(`${umeUrl}/profile/followings/${id}`)
}

// Unfollow another user
export const unfollowAUser = (id) => {
  return axios.delete(`${umeUrl}/profile/followings/${id}`)
}

// Delete a users profile entirely
export const deleteProfile = id => {
  return axios.delete(`${umeUrl}/profile/${id}`)
}

// Add experience to user profile
export const addExperience = (formData) => {
  return axios.put(`${umeUrl}/profile/experience`, formData)
}

// Delete an experience from the users profile 
export const deleteExperience = id => {
  return axios.delete(`${umeUrl}/profile/experience/${id}`)
}

// Add education to user profile
export const addEducation = (formData) => {
  return axios.put(`${umeUrl}/profile/education`, formData)
}

// Delete an education from the users profile 
export const deleteEducation = id => {
  return axios.delete(`${umeUrl}/profile/education/${id}`)
}

// Add a post
export const addAPost = (formData) => {
  return axios.post(`${umeUrl}/posts`, formData)
}

// Get posts
export const getAllPost = () => {
  return axios.get(`${umeUrl}/posts`)
}

// Get a single post!
export const getSinglePost = (id) => {
  return axios.get(`${umeUrl}/posts/${id}`)
}

// Like a post
export const likePost = (id) => {
  return axios.put(`${umeUrl}/posts/like/${id}`)
}

// Unlike a post
export const unlikePost = (id) => {
  return axios.delete(`${umeUrl}/posts/unlike/${id}`)
}

// Delete a post
export const deleteAPost = (id) => {
  return axios.delete(`${umeUrl}/posts/${id}`)
}

