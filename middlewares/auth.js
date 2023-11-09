const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../utils/errors')
const { JWT_SECRET } = require('../utils/production')

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  // const token = authorization.split('Bearer ')[1]
  const token = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация')
  }

  req.user = payload
  next()
}