const { constants } = require('http2')
const Movie = require('../models/movie')
const { ForbiddenError, NotFoundError } = require('../utils/errors')

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next)
}

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(constants.HTTP_STATUS_CREATED).send(movie))
    .catch(next)
}

// eslint-disable-next-line consistent-return
const handleErrors = async (req, res, func, mes, errorMessage, next) => {
  try {
    const { movieId } = req.params
    const result = await func(movieId)
    if (!result) {
      throw new NotFoundError(errorMessage)
    }
    res.status(constants.HTTP_STATUS_OK).json(result)
  } catch (err) {
    return next(err)
  }
}

// eslint-disable-next-line consistent-return
const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params
  Movie.findById(movieId).orFail(new NotFoundError('Фильм с указанным id не существует'))
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Нельзя удалять фильм из коллекции другого пользователя'))
      }
      // eslint-disable-next-line no-shadow
      const func = () => Movie.deleteOne(movie)
      const errorMessage = 'Удаление фильма из коллекции с несуществующим в БД id'
      const mes = 'Фильм удален'
      handleErrors(req, res, func, mes, errorMessage, next)
    })
    .catch(next)
}

// eslint-disable-next-line object-curly-newline
module.exports = { getMovies, createMovie, deleteMovieById }