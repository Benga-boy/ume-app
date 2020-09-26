import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addUserEducation} from '../../actions/profile'
import {Link, withRouter} from 'react-router-dom'

const AddEducation = ({addUserEducation, history}) => {
  const [formData, setFormData] = useState({
    school: '',
    subject: '',
    qualification: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })


  // ! Disable the to date if the education is the users current one
  const [toDateDisabled, toggleDisabled] = useState(false)

  const {
    school,
    subject,
    qualification,
    from,
    to,
    current,
    description
  } = formData

  // Function to handle change of input value
  const handleChange = e => {
    const education = {...formData, [e.target.name]: e.target.value}
    setFormData(education)
  }

  // Handle submit to server
  const handleSubmit = async e => {
    e.preventDefault()

    await addUserEducation(formData, history)

  }


  return (
    <Fragment>
    <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="qualification"
            required
            value={qualification}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="subject"
          value={subject}
          onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" 
          value={from}
          onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>
            <input checked={current} value={current} type="checkbox" name="current"
            onChange={e => {setFormData({...formData, current: !current}); toggleDisabled(!toDateDisabled)}}
            /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} disabled={toDateDisabled ? 'disabled' : ''}
          onChange={handleChange}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
          onChange={handleChange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addUserEducation: PropTypes.func.isRequired
}

export default connect(null, {addUserEducation})(withRouter(AddEducation)) 