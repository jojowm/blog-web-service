const mongoose = require('mongoose')
const crypto = require('crypto')

const { Schema } = mongoose

const userSchema = new Schema({
  username: String, // 用户名，登录名
  password: { // 加盐hash后的用户密码
    type: String,
    required: true
  },
  salt: String, // 盐
  nick_name: String, // 昵称
  create_time: {
    type: Date,
    default: Date.now()
  }, // 创建时间
  update_time: Date,
  bio: String, // 描述
  github: String, // GitHub地址,
  weibo: String, // 微博,
  email: String // 电子邮箱
})

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.create_time = this.update_time = Date.now()
  } else {
    this.update_time = Date.now()
  }
  let vm = this
  crypto.randomBytes(128, function (err, salt) {
    if (err) {
      throw(err)
    }
    vm.salt = salt
    crypto.pbkdf2(vm.password, salt, 100, 64, 'sha512', function (err, derivedKey) {
      if (err) {
        throw(err)
      }
      vm.password = derivedKey.toString('hex')

      next()
    })
  })
})

userSchema.options.toJSON = {
  transform (doc, ret) {
    delete ret.password
    delete ret.salt
  }
}

module.exports = mongoose.model('user', userSchema)
