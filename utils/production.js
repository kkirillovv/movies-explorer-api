require('dotenv').config()

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000
const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secretkey'
const DB_URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb'

module.exports = { PORT, JWT_SECRET, DB_URL }

// const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env
// payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secretkey')