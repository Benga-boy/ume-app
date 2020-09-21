import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

// Creating a secure route for secure components


const SecureRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => (
  // check to see if the user is authenticated and is still not loading. if ! then redirect to login
  <Route {...rest} render={props => !isAuthenticated && !loading ? 
  (<Redirect to="/login" />) : (<Component {...props} />)
  } />
)



SecureRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  auth: state.auth
})

export default connect(mapStatetoProps)(SecureRoute) 