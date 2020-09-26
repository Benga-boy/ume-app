import {setAlert} from './alert'
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  FOLLOW_USER
} from './types'
import { getUserProfile, createProfile, addExperience, addEducation, deleteExperience, deleteEducation, deleteProfile, getAllProfiles, getASingleProfile, getUserGithubRepos, followAnotherUser } from '../lib/api'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await getUserProfile()

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Get All profiles
export const getAllUserProfiles = () => async dispatch => {
  dispatch({type: CLEAR_PROFILE})
  try {
    const res = await getAllProfiles()

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Get A single user profile
export const getASingleUserProfile = (id) => async dispatch => {
  try {
    const res = await getASingleProfile(id)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Get the users github repos
export const getGithubRepos = (username) => async dispatch => {
  try {
    const res = await getUserGithubRepos(username)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Create or update a profile
export const createUserProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const res = await createProfile(formData)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Add experience to profile
export const addUserExperience = (formData, history) => async dispatch => {
  try {
    const res = await addExperience(formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))


      history.push('/dashboard')

  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Add education to profile
export const addUserEducation = (formData, history) => async dispatch => {
  try {
    const res = await addEducation(formData)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))


      history.push('/dashboard')

  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete a User entirely
export const deleteUserProfile = (id) => async dispatch => {
  // ! Confirm the user wants to delete their account
  if(window.confirm('Are you sure?')) {
    try {
      await deleteProfile(id)
  
      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({
        type: ACCOUNT_DELETED
      })
  
      dispatch(setAlert('Account deleted!'))

    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      })
    }
  }
}

// Delete an experience
export const deleteUserExperience = id => async dispatch => {
  try {
    const res = await deleteExperience(id)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience deleted', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete an education
export const deleteUserEducation = id => async dispatch => {
  try {
    const res = await deleteEducation(id)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education deleted', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Follow another user
export const followUser = (id) => async dispatch => {
  try {
    const res = await followAnotherUser(id)

    dispatch({
      type: FOLLOW_USER,
      payload: {id, favUser: res.data}
    })

    dispatch(setAlert('Following User', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}