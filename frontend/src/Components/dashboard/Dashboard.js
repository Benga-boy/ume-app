import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'

const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}}) => {
  
  // Get the users current profile on mount. Dont forget to add the getCurrentProfile as a prop
  useEffect(() => {
    getCurrentProfile()
  }, [])


  return loading && profile === null ? <h1>Loading....</h1> : 
  <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Welcome {user && user.name}
    </p>
    {profile !== null ? (<Fragment>has</Fragment>) : 
    (<Fragment>
      <p>You have not created a profile, please click below to create one</p>
      <Link to='/create-profile' className="btn btn-primary my-1" >
        Create Profile
      </Link>
    </Fragment>)}
  </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard) 