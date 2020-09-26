import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllUserProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({getAllUserProfiles, profile: {profiles, loading}}) => {
  useEffect(() => {
    getAllUserProfiles()
  }, [getAllUserProfiles])

  return (
    <Fragment>
        { loading ? <h1>Loading.....</h1> : <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with Developers!
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
            ) : <h4>No profiles found</h4>}
          </div>
          </Fragment>}
    </Fragment>
  )
}

Profiles.propTypes = {
  getAllUserProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getAllUserProfiles})(Profiles) 
