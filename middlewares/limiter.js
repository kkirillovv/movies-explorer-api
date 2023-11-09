// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimiter = require('express-rate-limit')

module.exports = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 200, // ограничение на количество запросов с одного IP
  message: 'Слишком много запросов от одного пользователя. Попробуйте через 30 минут.',
  statusCode: 429,
  headers: true,
})