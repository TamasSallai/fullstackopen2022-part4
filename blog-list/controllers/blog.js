const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => res.send(blogs))
})

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)
  blog.save().then((result) => res.status(201).send(result))
})

module.exports = blogRouter
