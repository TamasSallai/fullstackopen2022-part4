const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).end({ error: 'validation error' })
  } else if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformated id' })
  }
  next(err)
}

module.exports = errorHandler
