import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getASinglePost} from '../../actions/post'
import { useParams, Link } from 'react-router-dom'
import PostItem from './PostItem'
import PostComment from './PostComment'
import CommentItem from './CommentItem'


const Post = ({getASinglePost, post: {post, loading}}) => {

  const params = useParams()


  

  useEffect(() => {
    getASinglePost(params.post_id)
  }, [getASinglePost, params.post_id])


  return loading || post === null ? <h1>Loading...</h1> : <Fragment>
    <Link to="/posts" className="btn">Back to posts</Link>
    <PostItem post={post} showActions={false} />
    <PostComment postId={post._id} />
    <div className="comments">
      {post.comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={post._id} />)}
    </div>
  </Fragment>
}

Post.propTypes = {
  getASinglePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getASinglePost})(Post) 
