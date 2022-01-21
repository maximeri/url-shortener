const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const urlShortener = require('./models/urlShortener')
const bodyParser = require('body-parser')

require("./config/mongoose")
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

function makeCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  let code = makeCode(5)
  const shortenedURL = `http://localhost:3000/${code}`
  // if code already existed in db makeCode again till not existed
  if (urlShortener.findOne({ 'shortenedURL': shortenedURL }) === true) {
    code = makeCode(5)
  }
  const originalURL = req.body.url
  return urlShortener.create({
    originalURL: originalURL,
    code: code
  })
    .then(() => { res.render('index', { shortenedURL, isSuccessful: true }) })
})

app.get('/:code', async (req, res) => {
  const {code} = req.params
  const url = await urlShortener.findOne({ code })
  if (!url) {
    return res.render('index', { errorMessage: 'Wrong URL! Please check URL again or create another short URL.' })
  } else {
    console.log(url.originalURL)
    return res.redirect(url.originalURL)
  }
})

app.listen(PORT, () => {
  console.log('app is listening on localhost:3000')
})