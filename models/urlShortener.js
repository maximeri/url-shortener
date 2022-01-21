const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlShortenerSchema = new Schema({
  originalURL: String,
  code: String
})

module.exports = mongoose.model("UrlShortener", urlShortenerSchema)