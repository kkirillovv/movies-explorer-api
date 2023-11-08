const router = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { urlRegExp } = require('../utils/regexp')

const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies')

router.get('', getMovies)

router.post('', celebrate({
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
}), createMovie)

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovieById)

module.exports = router