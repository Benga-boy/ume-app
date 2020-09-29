import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../actions/post'

const PostComment = ({postId, addComment}) => {

  const [text, setText] = useState('')

    // Handle form input change
    const handleChange = (e) => {
      setText(e.target.value)
    }
  
    // Handle submit of post to server
    const handleSubmit = e => {
      e.preventDefault()
      addComment(postId, { text })
      setText('')
    }

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Post a comment...</h3>
        </div>
        <form onSubmit={handleSubmit} className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Add a comment"
            required
            value={text}
            onChange={handleChange}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  )
}

PostComment.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(PostComment) 
