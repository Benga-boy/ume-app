import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteUserEducation} from '../../actions/profile'

const Education = ({education, deleteUserEducation}) => {
  const educations = education.map(edu => <tr key={edu._id}>
    <td>{edu.school} </td>
    <td className="hide-sm">{edu.qualification} </td>
    <td>
        <p>{moment(edu.from).format('LL')}</p> - {
        edu.to === null ? (' Now') : (<p>{moment(edu.to).format('LL')}</p>)
      }
    </td>
    <td>
      <button onClick={() => deleteUserEducation(edu._id)} className="btn btn-danger">Delete</button>
    </td>
  </tr>
  )

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Qualification</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {educations}
        </tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
education: PropTypes.array.isRequired,
deleteUserEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteUserEducation})(Education) 