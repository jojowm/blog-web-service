const User = require('../models/user')
const crypto = require('crypto')

class UserController {
  async findAll (ctx) {
    ctx.body = await User.find()
  }

  async signUp (ctx) {
    const _user = ctx.request.body
    const user = await User.findOne({username: _user.username}).exec()
    if (user) {
      ctx.throw({message: '该用户名已存在'})
    } else {
      await new User(_user).save()
      ctx.body = {
        message: '注册成功'
      }
    }
  }

  async signIn (ctx) {
    const _user = ctx.request.body
    const user = await User.findOne({username: _user.username}).exec()
    if (user) {
      let derivedKey = crypto.pbkdf2Sync(_user.password, user.salt, 100, 64, 'sha512')
      if (user.password === derivedKey.toString('hex')) {
        ctx.session.user = user
        ctx.body = {
          user
        }
      } else {
        ctx.throw({message: '账号或密码错误'})
      }
    } else {
      ctx.throw({message: '账户不存在'})
    }
  }

  async signOut (ctx) {
    if (!ctx.session.user) {
      ctx.throw({message: '您未登录'})
    }
    ctx.session.user = null
    ctx.body = {
      message: '登出成功'
    }
  }

  async getProfile (ctx) {
    if (!ctx.session.user) {
      ctx.throw({message: '请先登录'})
    }
    const {
      nick_name,
      bio,
      github,
      weibo,
      email,
      tags
    } = ctx.session.user
    ctx.body = {
      nick_name,
      bio,
      github,
      weibo,
      email,
      tags
    }
  }

  async updateProfile (ctx) {
    if (!ctx.session.user) {
      ctx.throw({message: '请先登录'})
    }
    const user = ctx.session.user
    const data = ctx.request.body
    const userUpdated = Object.assign({}, user, data)
    try {
      const _user = await User.findByIdAndUpdate(user._id, userUpdated)
      ctx.session.user = _user
      ctx.body = {
        message: '修改成功'
      }
    } catch (e) {
      ctx.throw(e)
    }
  }

  async updateTags (ctx) {
    if (!ctx.session.user) {
      ctx.throw({message: '请先登录'})
    }
    const userSession = ctx.session.user
    const tags = ctx.request.body.tags
    if (!tags || tags.length < 1) {
      ctx.throw({message: '请传入tags'})
    }
    try {
      let user = await User.findById(userSession._id)
      user.tags = tags
      user.save()
      ctx.session.user = user
      ctx.body = {
        message: '修改成功'
      }
    } catch (e) {
      ctx.throw(e)
    }
  }
}

module.exports = new UserController()
