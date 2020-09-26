import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteUserExperience} from '../../actions/profile'

const Experience = ({experience, deleteUserExperience}) => {

  const experiences = experience.map(exp => <tr key={exp._id}>
    <td>{exp.company} </td>
    <td className="hide-sm">{exp.jobtitle} </td>
    <td>
        <p>{moment(exp.from).format('LL')}</p> - {
        exp.to === null ? (' Now') : (<p>{moment(exp.to).format('LL')}</p>)
      }
    </td>
    <td>
      <button onClick={() => deleteUserExperience(exp._id)} className="btn btn-danger">Delete</button>
    </td>
  </tr>
  )




  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
experience: PropTypes.array.isRequired,
deleteUserExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteUserExperience})(Experience) 