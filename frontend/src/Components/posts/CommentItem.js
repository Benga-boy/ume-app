import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { deleteAComment } from '../../actions/post'



const CommentItem = ({ comment: { _id, text, name, avatar, user, date }, postId, auth, deleteAComment }) => {

  const handleCommentDelete = () => {
    deleteAComment(postId, _id)
  }


  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`} >
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
            </p>
          <p className="post-date">
            {moment(date).format('LL')}
            </p>
            {!auth.loaing && user === auth.user._id && (
              <button onClick={handleCommentDelete} type="button" className="btn btn-danger">
                <i className="fas fa-times"></i>
              </button>
            )}
        </div>
      </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {deleteAComment})(CommentItem) 
