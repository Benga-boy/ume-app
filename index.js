const express = require('express')
const connectDB = require('./config/mongoose')
const usersRoute = require('./routes/api/users')
const authRoute = require('./routes/api/auth')
const postRoute = require('./routes/api/posts')
const profileRoute = require('./routes/api/profile')
const messageRoute = require('./routes/api/messages')

const app = express()

// * Connect the database
connectDB()

// * Initialise Middleware

app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API RUNNING!!!'))


// * Define the routes
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute)
app.use('/api/posts', postRoute)
app.use('/api/message', messageRoute)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

