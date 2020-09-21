const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


// Register a user! Use check to validate email, name and password fields
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include email',).isEmail(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
  const errors = validationResult(req)

  // Check if error occured
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    // Check if user exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }
    // set users avatar
    const avatar = gravatar.url(email, {
      size: '200',
      rating: 'pg',
      default: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    })
    // hash the users password

    const salt = await bcrypt.genSalt(8)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    // Assign the user a token
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('SECRET'), { expiresIn: 36000 }, (error, token) => {
      if (error) throw new error
      res.json({ token })
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})


module.exports = router