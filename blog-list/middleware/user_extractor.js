const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userExtractor = (req, res, next) => {
  if (req.token) {
    req.user = jwt.verify(req.token, process.env.SECRET)
  }
  next()
}

module.exports = userExtractor
