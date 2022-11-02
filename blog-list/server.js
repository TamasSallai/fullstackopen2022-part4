const { PORT, MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middleware/token_extractor')
const userExtractor = require('./middleware/user_extractor')
const errorHandler = require('./middleware/error_handler')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
