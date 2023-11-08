const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { createUser } = require('../controllers/users')
const { emailRegExp } = require('../utils/regexp')

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(3),
  }),
}), createUser)

module.exports = router