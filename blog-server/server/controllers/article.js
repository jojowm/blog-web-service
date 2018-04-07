const Article = require('../models/article')

class ArticleController {
  async findAll (ctx) {
    ctx.body = await Article.find()
  }

  async findById (ctx) {
    try {
      const article = await Article.findById(ctx.params.id)
      if (!article) {
        ctx.throw({message: '文章不存在'})
      }
      if (!ctx.session.user) {
        ++article.meta.count.reading
        article.save()
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
      ctx.body = {
        message: '修改成功'
      }
    } catch (e) {
      ctx.throw(e)
    }
  }

  async delete (ctx) {
    try {
      await Article.findByIdAndRemove(ctx.params.id)
      ctx.body = {
        message: '删除成功'
      }
    } catch (e) {
      ctx.throw(e)
    }
  }

  async findByTitle (ctx) {
    try {
      const queryTitle = ctx.query.title || ''
      let reg = new RegExp(queryTitle, 'i')
      const findArticles = await Article.find({title: reg})
      ctx.body = findArticles
    } catch (e) {
      ctx.throw(e)
    }
  }

  async comment (ctx) {
    try {
      let article = await Article.findById(ctx.params.id)
      const comment = ctx.request.body
      if (!comment.email || comment.email.length < 1) {
        ctx.throw({message: '请输入邮箱后进行评论'})
      }
      if (!comment.content || comment.content.length < 1) {
        ctx.throw({message: '请输入评论内容'})
      }
      article.comment.push(comment)
      article.save()
      ctx.body = {
        message: '评论成功'
      }
    } catch (e) {
      ctx.throw(e)
    }
  }
}

module.exports = new ArticleController()
