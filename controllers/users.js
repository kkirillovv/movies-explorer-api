const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { constants } = require('http2')
const { Promise } = require('mongoose')
const User = require('../models/user')
const { UnauthorizedError, NotFoundError, ConflictingRequestError } = require('../utils/errors')
const { JWT_SECRET } = require('../utils/production')

const isWrongEmailOrPassword = 'Неправильные почта или пароль'

// eslint-disable-next-line consistent-return
const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail()
    res.status(constants.HTTP_STATUS_OK).send({ data: user }) // !!! надо разобраться с data
  } catch (err) {
    return next(err)
  }
}

// eslint-disable-next-line consistent-return
const createUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { name, email, password } = req.body

    const hash = await bcrypt.hash(password, 10)
    // eslint-disable-next-line object-curly-newline
    const user = await User.create({ name, email, password: hash })
    res.status(constants.HTTP_STATUS_CREATED).json({
      name: user.name,
      email: user.email,
      _id: user._id,
    })
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictingRequestError('Такой email уже существует в базе пользователей'))
    }
    return next(err)
  }
}

// eslint-disable-next-line consistent-return
const editUserData = async (req, res, next) => {
  try {
    const { name, email } = req.body
    // eslint-disable-next-line max-len
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    if (!user) {
      return Promise.reject(new NotFoundError(`Пользователь с Id = ${req.user._id} не найден`))
    }
    res.status(constants.HTTP_STATUS_OK).send(user)
  } catch (err) {
    return next(err)
  }
}

// eslint-disable-next-line consistent-return
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findUserByCredentials(email, password)
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      // { expiresIn: '7d' },
    )
    res.status(constants.HTTP_STATUS_OK).send({ token })
  } catch (err) {
    if (err.message === isWrongEmailOrPassword) {
      return next(new UnauthorizedError(err.message))
    }
    return next(err)
  }
}

// eslint-disable-next-line object-curly-newline
module.exports = {
  getUserInfo,
  createUser,
  editUserData,
  loginUser,
}