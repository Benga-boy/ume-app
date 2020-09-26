import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {getASingleUserProfile, followUser} from '../../actions/profile'
import {connect} from 'react-redux'
import {useParams, Link} from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({getASingleUserProfile, profile: {profile, loading}, auth, followUser}) => {
  const params = useParams()


  useEffect(() => {
    getASingleUserProfile(params.user_id)
  }, [getASingleUserProfile, params.user_id])

  const handleUserFollow = () => {
    followUser(params.user_id)
  }

  return (
    <Fragment>
      {profile === null || loading ? <h1>No profile for this user!</h1> : <Fragment>
        <Link to="/profiles" className="btn btn-light">Return to Profiles</Link>
        {
          auth.isAuthenticated && auth.loading === false && auth.user._id !== params.user_id && <button onClick={handleUserFollow} className="btn">FOLLOW USER</button>
        }
        {auth.isAuthenticated && auth.loading === false && auth.user._id === params.user_id ? <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link> : null}
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile ={profile} />
          <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {
            profile.experience.length > 0 ? (<Fragment>
              {profile.experience.map(exp => <ProfileExperience key={exp._id} exp={exp} />)}
            </Fragment>) : (<h4>No Experience</h4>)
          }

          </div>
          <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {
            profile.education.length > 0 ? (<Fragment>
              {profile.education.map(edu => <ProfileEducation key={edu._id} edu={edu} />)}
            </Fragment>) : (<h4>No Education</h4>)
          }
          </div>

          {
            profile.githubusername && (
              <ProfileGithub username={profile.githubusername}/>
            )
          }
        </div>
        </Fragment>}
    </Fragment>
  )
}

Profile.propTypes = {
  getASingleUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, {getASingleUserProfile, followUser})(Profile) 
