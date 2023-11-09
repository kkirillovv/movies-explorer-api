const router = require('express').Router()
const { validateCreateMovie, validateDeleteMovieById } = require('../utils/validation')
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies')

router.get('', getMovies)
router.post('', validateCreateMovie, createMovie)
router.delete('/:movieId', validateDeleteMovieById, deleteMovieById)

module.exports = router