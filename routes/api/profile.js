const express = require('express')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Posts = require('../../models/Posts')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const router = express.Router()
const request = require('request')
const config = require('config')


// ! GET route to get user profile.....api/profile/me
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
      [ 'name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)

  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})


// ! CREATE A User profile.... 'api/profile'
router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Users profile object
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body

  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubusername) profileFields.githubusername = githubusername
  if (skills) {
    profileFields.skills = skills.split(' , ').map(skill => skill.trim())
  }

  // Build social fields
  profileFields.socials = {}
  if (youtube) profileFields.socials.youtube = youtube
  if (twitter) profileFields.socials.twitter = twitter
  if (facebook) profileFields.socials.facebook = facebook
  if (instagram) profileFields.socials.instagram = instagram
  if (linkedin) profileFields.socials.linkedin = linkedin


  // Create the users profile
  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      // update the profile
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
      return res.status(201).json(profile)
    }
    
    // * If no profile is found. Create one for the user

    profile = await Profile.create(profileFields)

    await profile.save()
    res.status(201).json(profile)

  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }

})


//! Get all the user profiles....api/profile
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.status(200).json(profiles)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

//! Get a single user profile....api/profile/user/:user_id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'User does not exist' })
    }
    res.status(200).json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Delete a user entirely...api/profile
router.delete('/:user_id', auth, async (req, res) => {
  try {
    // Remove posts created by that user
    await Posts.deleteMany({ user: req.user.id })

    //Remove the users profile
    await Profile.findOneAndRemove({ user: req.user.id })

    // Remove the user
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({ msg: 'User has been removed' })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! PUT request to api/profile/experience to ADD users experience
router.put('/experience', [auth, [
  check('jobtitle', 'Job Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    jobtitle,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body

  // Create new experience object
  const newExp = {
    jobtitle,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.experience.unshift(newExp)

    await profile.save()

    res.status(201).json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! DELETE an experience .... /api/profile/experience/:experience_id
router.delete('/experience/:experience_id', auth, async (req, res) => {
  try {

    // Get the profile of the user
    const profile = await Profile.findOne({ user: req.user.id })

    // Get the index of the experience to be deleted!
    const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.experience_id)
    
    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }

})

// ! Add the users education .. api/profile/education 
router.put('/education', [auth, [
  check('school', 'Place of study is required').not().isEmpty(),
  check('subject', 'Subject is required').not().isEmpty(),
  check('qualification', 'Achievement is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async(req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    school,
    subject,
    qualification,
    from,
    to,
    current,
    description
  } = req.body

  // Create new education object
  const newExp = {
    school,
    subject,
    qualification,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.education.unshift(newExp)

    await profile.save()

    res.status(201).json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Delete an education .. api/profile/education/:education._id
router.delete('/education/:education_id', auth, async (req, res) => {
  try {

    // Get the profile of the user
    const profile = await Profile.findOne({ user: req.user.id })

    // Get the index of the education to be deleted!
    const removeIndex = profile.education.map(item => item._id).indexOf(req.params.education_id)
    
    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }

})

// ! Get the users github repos ... api/profile/github/:username
router.get('/github/:username', async(req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if (error) {
        console.error(error)
      }

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No Github profile found' })
      }

      return res.json(JSON.parse(body))
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Add another user to your favourites .... api/profile/followings/:user_id
router.post('/followings/:user_id', auth, async (req, res) => {
  try {
    const user = await Profile.findOne({ user: req.user.id })
    if (!user) throw new Error('Unauthorised!')
    const favUsers = await Profile.findById(req.params.user_id).populate('User', ['name', 'avatar', '_id'])
    if (!favUsers) {
      return res.status(400).json({ msg: 'User not found' })
    }
    if (user._id.equals(favUsers.id)) {
      return res.status(400).json({ msg: 'You cannot add yourself!' })
    }
    if (user.following.favUsers.includes(favUsers._id)) {
      return res.status(400).json({ msg: 'Already following this user!' })
    }
    user.following.favUsers.push(favUsers)
    await user.save()
    res.status(201).json(user.following.favUsers)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})

// ! Remove a user from your favourites ... api/profile/followings/:user_id
router.delete('/followings/:user_id', auth, async (req, res) => {
  try {
    // Find the users profile
    const user = await Profile.findOne({ user: req.user.id })
    // eslint-disable-next-line eqeqeq
    //Find the user to be deleted
    const userToDelete = user.following.favUsers.filter(item => item.toString() === req.params.user_id)
    // Delete the user
    await user.following.favUsers.remove(userToDelete)
    await user.save()

    res.status(204).json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})


module.exports = router