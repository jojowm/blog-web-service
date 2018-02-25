const Koa = require('koa')
const logger = require('koa-logger')
const body = require('koa-bodyparser')
const mongoose = require('mongoose')

const articleRoutes = require('./routers/article')

const app = new Koa()

app
  .use(logger())
  .use(body())
  .use(articleRoutes.routes())

app.listen(3002, () => {
  console.log('Koa is running at 3002')
})

const CONNECTION_STR = 'mongodb://db:27017/blog'
mongoose.connect(CONNECTION_STR, {config: {autoIndex: false}})
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${CONNECTION_STR}`)
})
mongoose.connection.on('error', err => {
  console.error(`[Mongoose error]: ${err}`)
})
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed')
    process.exit(0)
  })
})

module.exports = app
