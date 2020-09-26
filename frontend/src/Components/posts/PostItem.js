import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import {likeAPost, unlikeApost, deletePost} from '../../actions/post'

const PostItem = ({ post: { _id, text, name, avatar, user, likes, comments, date }, auth, likeAPost, unlikeApost, deletePost, showActions }) => {

  const handlePostLike = () => {
    likeAPost(_id)
  }

  const handlePostUnlike = () => {
    unlikeApost(_id)
  }

  const handlePostDelete = () => {
    deletePost(_id)
  }

  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt={`${name} dev community`}
            />
            <h4>{name} </h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
          <p className="post-date">
            Posted on {moment(date).format('LL')}
            </p>
            {showActions && <Fragment>
              <button onClick={handlePostLike} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button type="button" onClick={handlePostUnlike} className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion {comments.length > 0 && <span className='comment-count'>{comments.length} </span>} 
          </Link>
          {!auth.loading && user === auth.user._id && (
          <button
          type="button"
          className="btn btn-danger"
          onClick={handlePostDelete}
        >
          <i className="fas fa-times"></i>
        </button>
          )}
              </Fragment>}
        </div>
      </div>
    </Fragment>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  likeAPost: PropTypes.func.isRequired,
  unlikeApost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {likeAPost, unlikeApost, deletePost})(PostItem) 
