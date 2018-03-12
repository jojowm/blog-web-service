const router = require('koa-router')()
const UserController = require('../controllers/user')

router.prefix('/user')

router.get('/list', UserController.findAll)
router.post('/sign_up', UserController.signUp)
router.post('/sign_in', UserController.signIn)

module.exports = router
