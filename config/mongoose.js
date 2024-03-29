const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost/url-shortener'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
}).once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db