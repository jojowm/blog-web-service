const Redis = require('ioredis')
const { Store } = require('koa-session2')

module.exports = class RedisStore extends Store {
  constructor () {
    super()
    this.redis = new Redis({
      port: 6379,
      host: 'redis'
    })
  }

  async get (sid, ctx) {
    return JSON.parse(await this.redis.get(`SESSION:${sid}`))
  }

  async set (session, { sid = this.getID(24), maxAge = 18000000 } = {}, ctx) {
    try {
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000)
    } catch (e) {
      ctx.throw({message: 'Redis 缓存故障'})
    }
    return sid
  }

  async destory (sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`)
  }
}
