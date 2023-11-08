const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { emailRegExp } = require('../utils/regexp')

const {
  getUserInfo, editUserData,
} = require('../controllers/users')

router.get('/me', getUserInfo)

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegExp),
  }),
}), editUserData)

module.exports = router