import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PropTypes from 'prop-types'


const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  // Links for authenticated routes
  const authLinks = (
    <ul>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/dashboard"><i className="fas fa-user"></i><span className="hide-sm"> Dashboard</span></Link></li>
        <li><a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Logout</span></a></li>
      </ul>
  )


  // Links for non-authenticated routes!
  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )


  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i>Ume</Link>
      </h1>
      {/* Check if loading is false. If it is, display authenticated routes, else, display guest links! */}
      {!loading ? <Fragment>
        {isAuthenticated ? authLinks : guestLinks}
      </Fragment> : null}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar) 