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
}

module.exports = new UserController()
