const mongoose = require('../config/mongoose')
const Schema = mongoose.Schema
const urlShortenerSchema = new Schema({
  ogURL: String,
  shortenedURL: String
})

module.exports = mongoose.model("UrlShortener", urlShortenerSchema)