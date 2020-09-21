import React from 'react'
import { Link, Redirect } from 'react-router-dom'
// Stop user going to landing page when logged in! 
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Home = ({isAuthenticated}) => {

  // if the user is authenticated then redirect them to their dashboard

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }


  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Ume Developer LinkUp</h1>
          <p className="lead">
            Create a developer profile, showoff your github repositories share and like posts, favourite other developers and contact them
          </p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">Sign Up</Link>
            <Link className="btn btn-light" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Home) 