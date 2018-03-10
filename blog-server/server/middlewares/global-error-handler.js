const { assign } = require('lodash/object')

module.exports = async (ctx, next) => {
  try {
    await next()
    if (ctx.response.status === 404 && !ctx.response.body) {
      throw({status: 404, message: 'not found'})
    }
    ctx.response.status = 200
    ctx.body = assign({}, {data: ctx.body}, {status: true})
  } catch (e) {
    ctx.response.status = e.statusCode || e.status || 500
    ctx.body = assign({status: false}, {
      error: e.message,
      message: e.message || '后端服务器异常'
    })
  }
}
