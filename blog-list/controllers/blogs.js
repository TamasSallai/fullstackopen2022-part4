const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blog = await Blog.find({}).populate('user', {
      id: 1,
      username: 1,
      name: 1,
    })
    res.send(blog)
  } catch (err) {
    next(err)
  }
})

blogRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body
    const authUser = req.user

    if (!authUser) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(authUser.id)

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).send(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const authUser = req.user
    if (!authUser) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blogToRemove = await Blog.findById(req.params.id)
    if (!blogToRemove) {
      return res.status(404).send({ error: "blog doesn't exists" })
    }

    if (authUser.id !== blogToRemove.user.toString()) {
      return res
        .status(401)
        .send({ error: "unauthorized, blog doesn't belong to user" })
    }

    await blogToRemove.remove()
    res
      .status(200)
      .send({ message: `blog with id: ${req.params.id} removed successfully` })
  } catch (err) {
    next(err)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = {
      likes: req.body.likes,
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
    if (updated) {
      return res.status(200).end()
    } else {
      return res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter
