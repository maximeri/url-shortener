const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const urlShortener = require('./models/urlShortener')
require("./config/mongoose")
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  urlShortener.create()
  res.render('index')
})

app.listen(PORT, () => {
  console.log('app is listening on localhost:3000')
})