const mongoose = require('mongoose')

const { Schema } = mongoose

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  class: Array,
  tags: Array,
  meta: {
    time: String,
    count: {
      comment: Number,
      word: Number,
      reading: Number,
      likes: Number
    }
  }
})

module.exports = mongoose.model('article', articleSchema)
