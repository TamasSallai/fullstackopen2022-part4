const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).end()
  } else if (err.name === 'CastError') {
    return res.status(400).end()
  }
  next(err)
}

module.exports = errorHandler
