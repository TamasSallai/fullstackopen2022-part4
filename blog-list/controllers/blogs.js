const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
    const { userId, title, author, url, likes } = req.body

    if (!userId) {
      return res
        .status(400)
        .send({ error: 'bad request, no user id was given' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(401).send({ error: "unauthorized, user doesn't exist" })
    }

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
    const removed = await Blog.findByIdAndRemove(req.params.id)
    if (removed) {
      return res.status(204).end()
    } else {
      return res.status(404).end()
    }
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
