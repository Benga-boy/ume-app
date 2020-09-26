import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getASinglePost} from '../../actions/post'
import { useParams, Link } from 'react-router-dom'
import PostItem from './PostItem'

const Post = ({getASinglePost, post: {post, loading}}) => {

  const params = useParams()


  

  useEffect(() => {
    getASinglePost(params.post_id)
  }, [getASinglePost, params.post_id])


  return loading || post === null ? <h1>Loading...</h1> : <Fragment>
    <Link to="/posts" className="btn">Back to posts</Link>
    <PostItem post={post} showActions={false} />
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
