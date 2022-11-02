const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).end({ error: 'validation error' })
  } else if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformated id' })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid token' })
  }
  next(err)
}

module.exports = errorHandler
