import React, {useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createUserProfile, getCurrentProfile} from '../../actions/profile'

const EditProfile = ({profile: {profile, loading}, createUserProfile, history, getCurrentProfile}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    bio: '',
    status: '',
    githubusername: '',
    skills: [],
    youtube: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  })

  const [showSocial, toggleShowSocial] = useState(false)

    // Get the users current profile
    useEffect(() => {
      const res = getCurrentProfile()
      console.log(res)
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        bio: loading || !profile.bio ? '' : profile.bio,
        githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
        skills: loading || !profile.skills ? '' : profile.skills,
        youtube: loading || !profile.youtube ? '' : profile.youtube,
        facebook: loading || !profile.facebook ? '' : profile.facebook,
        twitter: loading || !profile.twitter ? '' : profile.twitter,
        instagram: loading || !profile.instagram ? '' : profile.instagram,
        linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
      })
    }, [loading, getCurrentProfile])

  // Function to handle toggle of social input
  const toggleSocial = () => {
    toggleShowSocial(!showSocial)
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = formData


  // Function to handle input change on form
  const handleChange = e => {
    const data = {...formData, [e.target.name]: e.target.value}
    setFormData(data)
  }

  // Submit the user profile to server
  const handleSubmit = async e => {
    e.preventDefault()

    createUserProfile(formData, history, true)
    
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's make you stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <select name="status" value={status} onChange={handleChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={handleChange}/>
          <small className="form-text"
            >Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={handleChange} />
          <small className="form-text"
            >Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={handleChange} />
          <small className="form-text"
            >City </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={handleChange} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={handleChange}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={handleChange} ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={toggleSocial} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {showSocial && <Fragment>
          <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input value={twitter} onChange={handleChange} type="text" placeholder="Twitter URL" name="twitter" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input value={facebook} onChange={handleChange} type="text" placeholder="Facebook URL" name="facebook" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" value={youtube} onChange={handleChange} placeholder="YouTube URL" name="youtube" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" value={linkedin} onChange={handleChange} placeholder="Linkedin URL" name="linkedin" />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" value={instagram} onChange={handleChange} placeholder="Instagram URL" name="instagram" />
        </div>
          </Fragment>}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}


const mapPropsToState = state => ({
  profile: state.profile
})


export default connect(mapPropsToState, {createUserProfile, getCurrentProfile})(withRouter(EditProfile))