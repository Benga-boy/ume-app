import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loginUser} from '../../actions/auth'

const Login = ({loginUser, isAuthenticated}) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const history = useHistory()

  const {email, password} = loginData

// on change handler to handle form inputs and update state value
const handleChange = e => {
  setLoginData({...loginData, [e.target.name]: e.target.value})
}

const handleSubmit = e => {
  e.preventDefault()
  loginUser({email, password})
  setLoginData({...loginData, email: '', password: ''})
  console.log(loginUser)
}

    // Redirect if logged in
    if (isAuthenticated) {
      // push the user to their dashboard
      return history.push('/dashboard')
    }


  return (
    <Fragment>
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Login to Your Account</p>
      <form onSubmit={handleSubmit} className="form" action="dashboard.html">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={handleChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  IsAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {loginUser})(Login) 