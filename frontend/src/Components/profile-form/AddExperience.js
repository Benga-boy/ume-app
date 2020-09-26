import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addUserExperience} from '../../actions/profile'
import {Link, withRouter} from 'react-router-dom'

const AddExperience = ({addUserExperience, history}) => {
  const [formData, setFormData] = useState({
    jobtitle: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })


  // ! Disable the to date if the experience is the users current one
  const [toDateDisabled, toggleDisabled] = useState(false)

  const {
    jobtitle,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData

  // Function to handle change of input value
  const handleChange = e => {
    const experience = {...formData, [e.target.name]: e.target.value}
    setFormData(experience)
  }

  // Handle submit to server
  const handleSubmit = async e => {
    e.preventDefault()

    await addUserExperience(formData, history)

  }


  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input value={jobtitle} onChange={handleChange} type="text" placeholder="* Job Title" name="jobtitle" required />
        </div>
        <div className="form-group">
          <input value={company} onChange={handleChange} type="text" placeholder="* Company" name="company" required />
        </div>
        <div className="form-group">
          <input value={location} onChange={handleChange} type="text" placeholder="Location" name="location" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input value={from} onChange={handleChange} type="date" name="from" />
        </div>
        <div className="form-group">
          <p><input onChange={e => {setFormData({...formData, current: !current}); toggleDisabled(!toDateDisabled) }} checked={current} type="checkbox" name="current" value={current} /> {' '} Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input value={to} onChange={handleChange} type="date" name="to" disabled={toDateDisabled ? 'disabled' : ''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addUserExperience: PropTypes.func.isRequired
}

export default connect(null, {addUserExperience})(withRouter(AddExperience)) 