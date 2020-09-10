const express = require('express')
const auth = require('../../middleware/auth')
const Posts = require('../../models/Posts')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const Filter = require('bad-words')


const router = express.Router()


//! Route to add a post
router.post('/', [auth,
  [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  // Create the post
  try {
    // find the user and remove the password from showing
    const user = await User.findById(req.user.id ).select('-password')

    // Post objects
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    // Filter out bad words
    const filter = new Filter()
    if (filter.isProfane(newPost.text)) {
      res.status(422).json({ msg: 'Profanity is not allowed!' })
    }
    const post = await Posts.create(newPost)
    await post.save()
    res.json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }

})

// ! GET ALL POSTS!
router.get('/', auth, async(req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 })
    res.status(200).json(posts)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! GET A SINGLE POST
router.get('/:post_id', auth, async(req, res) => {
  try {
    const post = await Posts.findById(req.params.post_id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' })
    }
    res.status(200).json(post)
  } catch (err) {
    console.log(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error!')
  }
})

// ! DELETE A POST
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const postToDelete = await Posts.findById(req.params.post_id)
    if (!postToDelete) {
      return res.status(404).json({ msg: 'Post not found!' })
    }
    if (!postToDelete.user.equals(req.user.id)) {
      res.status(401).json({ msg: 'User not authorised!' })
    }
    await postToDelete.remove()
    res.send('Post has been deleted!')
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Like a post! api/posts/like/:post_id
router.put('/like/:post_id', auth, async(req, res) => {
  try {
    // Find the post
    const likedPost = await Posts.findById(req.params.post_id)
    const likedUser = req.user.id
    if (!likedPost) {
      return res.status(404).json({ msg: 'Post not found!' })
    }
    // check if the user has already liked the post
    // Get the user that liked the post via token and push into the likes array
    if (likedPost.likes.filter(like => like.user.toString() === likedUser).length > 0) {
      return res.status(400).json({ msg: 'You already liked this post!' })
    }
    likedPost.likes.unshift({ user: likedUser })

    await likedPost.save()

    res.status(201).json(likedPost.likes)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Unlike a post! .. api/posts/like/:post_id
router.delete('/unlike/:post_id', auth, async(req, res) => {
  try {
    // Find the post
    const likedPost = await Posts.findById(req.params.post_id)
    const likedUser = req.user.id
    if (!likedPost) {
      return res.status(404).json({ msg: 'Post not found!' })
    }
    // check if the user has already liked the post
    if (likedPost.likes.filter(like => like.user.toString() === likedUser).length === 0) {
      return res.status(400).json({ msg: 'You have not like this post!' })
    }

    // Get the remove index of the post
    const removeIndex = likedPost.likes.map(like => like.user.toString()).indexOf(likedUser)

    likedPost.likes.splice(removeIndex, 1)
    await likedPost.save()

    res.json({ msg: 'Post Unliked' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})


// ! Add comments to the post! .... api/posts/comments/:post_id
router.put('/comments/:post_id', [auth,
  [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  // Create the Comment
  try {
    const post = await Posts.findById(req.params.post_id)
    // find the user 
    const user = await User.findById(req.user.id).select('-password')

    // Post objects
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }
    post.comments.unshift(newComment)
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }

})

// ! Delete a comment
router.delete('/comments/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.post_id)
    // Check if post exists!
    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' })
    }

    // Get the comment to delete
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)

    // Check comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' })
    }

    // Check its the user that posted the comment or user that owns the comment before deleting
    if (!comment.user.equals(req.user.id)) {
      res.status(401).json({ msg: 'Unauthorised!' })
    }
    // Get the remove index
    // Delete the comment
    comment.remove()

    await post.save()
    res.json(post.comments)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

module.exports = router