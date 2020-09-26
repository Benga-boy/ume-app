import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const profileEducation = ({ edu: {school, from, to, qualification, subject, description } }) => {
  return (
    <Fragment>
      <div>
        <h3>{school} </h3>
        <p>{`${moment(from).format('LL') }`} - {to ? `${moment(to).format('LL')}` : `current`}</p>
        <p><strong>Degree: </strong>{qualification} </p>
        <p><strong>Field Of Study: </strong>{subject} </p>
        <p>
          <strong>Description: </strong> {description}
            </p>
      </div>
    </Fragment>
  )
}

profileEducation.propTypes = {
  edu: PropTypes.object.isRequired,
}

export default profileEducation
