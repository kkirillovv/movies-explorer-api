const router = require('express').Router()
const { validateLoginUser } = require('../utils/validation')
const { loginUser } = require('../controllers/users')

router.post('/', validateLoginUser, loginUser)

module.exports = router