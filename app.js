const express = require('express')
const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet')
const { errors } = require('celebrate')
const cors = require('cors')

const corseAllowedOrigins = [
  'http://localhost:3001',
  'http://kme.nomoredomainsrocks.ru',
  'https://kme.nomoredomainsrocks.ru',
]

const { requestLogger, errorLogger } = require('./middlewares/logger')
const rateLimiter = require('./middlewares/limiter')
const { handleErrors } = require('./utils/errors')
const router = require('./routes')
const { PORT, DB_URL } = require('./utils/production')

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
})

const app = express()
app.use(cors({
  origin: corseAllowedOrigins,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(rateLimiter)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger) // подключаем логгер запросов
app.use(router) // за ним идут все обработчики роутов
app.use(errorLogger) // подключаем логгер ошибок
app.use(errors()) // обработчик ошибок celebrate
app.use(handleErrors) // централизованный обработчик ошибок

app.listen(PORT) // Слушаем порт