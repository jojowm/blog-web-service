const Article = require('../models/article')

class ArticleController {
  async finaAll (ctx) {
    ctx.body = await Article.find()
  }

  async findById (ctx) {
    try {
      const article = await Article.findById(ctx.params.id)
      if (!article) {
        ctx.throw('文章不存在')
      }
      ctx.body = article
    } catch (e) {
      ctx.throw(e)
    }
  }

  async create (ctx) {
    try {
      const article = await new Article(ctx.request.body).save()
      ctx.body = article
    } catch (e) {
      ctx.throw(e)
    }
  }

  async update (ctx) {
    try {
      await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    } catch (e) {
      ctx.throw(e)
    }
  }

  async delete (ctx) {
    try {
      await Article.findByIdAndRemove(ctx.params.id)
      // ctx.body = {
      //   status: true
      // }
    } catch (e) {
      ctx.throw(e)
    }
  }
}

module.exports = new ArticleController()
