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
    create_time: Date,
    update_time: Date,
    count: {
      comment: Number,
      word: Number,
      reading: Number,
      likes: Number
    }
  },
  content: {
    type: String,
    default: ''
  }
})

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    const time = Date.now()
    this.meta = {
      create_time: time,
      update_time: time,
      count: {
        comment: 0,
        word: this.content.length || 0,
        reading: 0,
        likes: 0
      }
    }
  }
  next()
})

module.exports = mongoose.model('article', articleSchema)
