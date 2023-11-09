const router = require('express').Router()
const usersRouter = require('./users')
const loginUser = require('./signin')
const createUser = require('./signup')
const moviesRouter = require('./movies')
const auth = require('../middlewares/auth')
const { NotFoundError } = require('../utils/errors')

// за ним идут все обработчики роутов
router.use('/signin', loginUser)
router.use('/signup', createUser)
router.use(auth)
router.use('/users', usersRouter)
router.use('/movies', moviesRouter)
// eslint-disable-next-line no-unused-vars
router.use('*', (req, res) => {
  const isPageNotFoundError = 'Запрашиваемая страница не найдена'
  throw new NotFoundError(isPageNotFoundError)
})

module.exports = router