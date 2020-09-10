const mongoose = require('mongoose')


const ResponseSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 300
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
})


const MessageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 300
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: [ResponseSchema] // * Array of chain messages!
  
}, {
  timestamps: true
})

const Message = mongoose.model('Messages', MessageSchema)
const Response = mongoose.model('Response', ResponseSchema)

module.exports = {
  Message,
  Response
}

