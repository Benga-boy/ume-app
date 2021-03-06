const mongoose = require('mongoose')

// * User profile model
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      jobtitle: {
        type: String,
        required: true
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      qualification: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      }, 
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  socials: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  following: {
    favUsers: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      }
    ]
  }
})

module.exports = mongoose.model('Profile', ProfileSchema)