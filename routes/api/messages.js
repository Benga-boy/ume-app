const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { Message, Response } = require('../../models/Messages')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')



// ! Create a message to send to another user .... api/message/:user_id
router.post('/:user_id', [auth, [
  check('text', 'Text is required to send a message').not().isEmpty()
]], async(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  // Create the message to send to another user
  try {
    const user = await User.findById(req.user.id).select('-password')
    const recipient = await User.findById(req.params.user_id).select('-password')

    if (!recipient) {
      return res.status(400).json({ msg: 'User not found!' })
    }
    if (req.user.id === recipient.id) {
      return res.status(422).json({ msg: 'You Cannot messgae yourself!' })
    }
    
    // Create new message object
    const newMessage = {
      text: req.body.text,
      user,
      recipient
    }
    // create the message
    const message = await Message.create(newMessage)

    // Save the message
    await message.save()

    res.status(201).json(message)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Responde to a message ... /api/message/:message_id
router.post('/reply/:message_id', [auth, [
  check('text', 'Text is required!').not().isEmpty()
]], async(req, res) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() })
  }

  try {
    const originalMessage = await Message.findById(req.params.message_id)
    const user = await User.findById(req.user.id).select('-password')

    if (!originalMessage) {
      return res.status(404).json({ msg: 'Message not found!' })
    }

    if (!originalMessage.user.equals(req.user.id) && !originalMessage.recipient.equals(req.user.id)) {
      return res.status(404).json({ msg: 'Unauthorised!' })
    }

    // * Create new reply object
    const newReply = {
      text: req.body.text,
      user
    }

    // * Create the reply
    const reply = await Response.create(newReply)
    
    originalMessage.response.unshift(reply)

    await originalMessage.save()
    
    res.status(201).json(originalMessage)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Get a single Messages! /api/message/:message_id
router.get('/:message_id', auth, async(req, res) => {
  try {
    const message = await Message.findById(req.params.message_id)
    if (!message) {
      return res.status(404).json({ msg: 'Message not found!' })
    }

    // * If the current user logged in does not own the message. Deny access!
    if (!message.user.equals(req.user.id) && !message.recipient.equals(req.user.id)) {
      return res.status(404).json({ msg: 'Unauthorised!' })
    }

    res.status(200).json(message)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Get a single Messages! /api/message/:message_id
router.get('/', auth, async(req, res) => {
  try {
    const messages = await Message.find()

    // Get the recipients Id from the messages array by filtering through
    const currentUserMessages = messages.filter(message => message.recipient.toString() === req.user.id)
    if (currentUserMessages.length < 1) {
      return res.status(404).json({ msg: 'No Messages' })
    }
    const currentRecipient = [...new Set(currentUserMessages.map(item => item.recipient))] 
    const recipient = currentRecipient[0].toString()

    // * If the current user logged in does not own the message. Deny access!
    if (!recipient === req.user.id) {
      return res.status(404).json({ msg: 'Unauthorised!' })
    }

    res.status(200).json(currentUserMessages)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Delete a message /api/message/:message_id
router.delete('/:message_id', auth, async(req, res) => {
  try {
    const messageToDelete = await Message.findById(req.params.message_id)
    if (!messageToDelete) {
      return res.status(404).json({ msg: 'Message not found!' })
    }
    
    // Check to make sure the user owns that message
    if (!messageToDelete.recipient.equals(req.user.id)) {
      return res.status(404).json({ msg: 'Unauthorised!' })
    }

    await messageToDelete.remove()

    res.json({ msg: 'Message deleted!' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ msg: 'Server Error!' })
  }
})


module.exports = router