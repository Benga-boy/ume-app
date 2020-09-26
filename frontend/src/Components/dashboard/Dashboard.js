import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile, deleteUserProfile} from '../../actions/profile'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}, deleteUserProfile}) => {
  
  // Get the users current profile on mount. Dont forget to add the getCurrentProfile as a prop
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])


  return loading && profile === null ? <h1>Loading....</h1> : 
  <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Welcome {user && user.name}
    </p>
    {profile !== null ? (<Fragment>
      <DashboardActions/>
      <Experience experience={profile.experience} />
      <Education education={profile.education} />

      {/* Delete the users account! */}
      <div className="my-2">
        <button onClick={() => deleteUserProfile(user._id)}  className="btn btn-danger">
        <i className="fas fa-user-minus"></i> Delete Account</button>
      </div>
    </Fragment>) : 
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
  deleteUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteUserProfile})(Dashboard) 