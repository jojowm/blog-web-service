module.exports = async (ctx, next) => {
  try {
    ctx.response.status = 200
    ctx.response.body
      ? ctx.response.body.status = true
      : ctx.response.body = {
        status: true
      }
    await next()
  } catch (e) {
    ctx.response.status = 500
    ctx.response.body = {
      error: e.message,
      message: '后端服务器异常'
    }
  }
}
