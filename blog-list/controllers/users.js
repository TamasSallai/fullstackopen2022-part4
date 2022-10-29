const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { user: 0, likes: 0 })
  res.send(users)
})

userRouter.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body
    if (!(username && password)) {
      return res.status(400).send({ error: 'missing username or password' })
    }

    if (username.length < 3 || password.length < 3) {
      return res.status(400).send({
        error: 'both username and password must be at least 3 characters long',
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ name, username, passwordHash })
    const savedUser = await user.save()
    res.status(201).send(savedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = userRouter
