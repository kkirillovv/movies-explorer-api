const { celebrate, Joi } = require('celebrate')
const { urlRegExp, emailRegExp } = require('./regexp')

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(3),
  }),
})

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(3),
  }),
})

const validateEditUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegExp),
  }),
})

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegExp),
    trailerLink: Joi.string().required().pattern(urlRegExp),
    thumbnail: Joi.string().required().pattern(urlRegExp),
    movieId: Joi.number().required(), // !!! Здесь намбер должен быть
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
})

const validateDeleteMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
})

module.exports = {
  validateCreateUser,
  validateLoginUser,
  validateEditUserData,
  validateCreateMovie,
  validateDeleteMovieById,
}