const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// GET route to get user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// Login a user

router.post('/', [
  check('email', 'Please include email',).isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req)

  // Check if error occured
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials!' }] })
    }

    // Compare user password with password typed in
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials!' }] })
    }

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