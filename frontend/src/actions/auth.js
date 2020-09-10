import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL} from './types'
import {register, loadUser, login} from '../lib/api'
import {setAlert} from './alert'
import {setAuthToken} from '../utils/setAuthToken'

// Load a user
export const loadAUser = () =>  async dispatch => {
  // Set header with token if there is one
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await loadUser()
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }

}

// Register User
export const registerUser = ({name, email, password}) => async dispatch => {
  const data = {name, email, password}
  try {
    const res = await register(data)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadAUser())
  } catch (err) {
    // Check for errors and if there is, loop through them to display the error
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }


    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
export const loginUser = ({email, password}) => async dispatch => {
  const data = {email, password}
  try {
    const res = await login(data)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadAUser())
  } catch (err) {
    // Check for errors and if there is, loop through them to display the error
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }


    dispatch({
      type: LOGIN_FAIL
    })
  }
}