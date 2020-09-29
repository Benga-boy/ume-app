import { setAlert } from './alert'
import { GET_POSTS, POST_ERROR, LIKE_POST, DELETE_POST, ADD_POST, GET_POST, POST_COMMENT, REMOVE_COMMENT} from './types'
import { getAllPost, likePost, unlikePost, deleteAPost, addAPost, getSinglePost, postComment, deleteComment } from '../lib/api'


// GET a Post
export const getASinglePost = (id) => async dispatch => {
  try {
    const res = await getSinglePost(id)

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// GET Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await getAllPost()

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}


// Like a post
export const likeAPost = (id) => async dispatch => {
  try {
    const res = await likePost(id)

    dispatch({
      type: LIKE_POST,
      payload: {id, likes: res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Unlike a post
export const unlikeApost = (id) => async dispatch => {
  try {
    const res = await unlikePost(id)

    dispatch({
      type: LIKE_POST,
      payload: {id, likes: res.data}
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Add a post
export const addPost = formData => async dispatch => {
  try {
    const res = await addAPost(formData)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert('Post Created', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete a post
export const deletePost = id => async dispatch => {
  try {
    await deleteAPost(id)

    dispatch({
      type: DELETE_POST,
      payload: id
    })

    dispatch(setAlert('Post Removed', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}


// Add a comment to a post
export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await postComment(postId, formData)

    dispatch({
      type: POST_COMMENT,
      payload: res.data
    })

    dispatch(setAlert('Comment Added', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete a comment
export const deleteAComment = (postId, commentId) => async dispatch => {
  try {
    await deleteComment(postId, commentId)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert('Comment Deleted', 'success'))

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}
