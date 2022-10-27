const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blog = await Blog.find({})
    res.send(blog)
  } catch (err) {
    next(err)
  }
})

blogRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body)
    const saved = await blog.save()
    res.status(201).send(saved)
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
