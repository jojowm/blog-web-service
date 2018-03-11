const User = require('../models/user')

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
    }
  }
}

module.exports = new UserController()
