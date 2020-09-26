import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const ProfileExperience = ({ exp: {company, jobtitle, description, from, to }}) => {
  return (
    <Fragment>
      <div>
        <h3 className="text-dark">{company} </h3>
        <p>{`${moment(from).format('LL') }`} - {to ? `${moment(to).format('LL')}` : `current`} </p>
        <p><strong>Position: </strong>{jobtitle} </p>
        <p>
          <strong>Description: </strong>{description}
        </p>
      </div>
    </Fragment>
  )
}

ProfileExperience.propTypes = {
  exp: PropTypes.object.isRequired
}

export default ProfileExperience
