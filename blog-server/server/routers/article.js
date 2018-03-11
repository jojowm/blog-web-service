const router = require('koa-router')()
const ArticleController = require('../controllers/article')

router.prefix('/article')

router.get('/list', ArticleController.findAll)

router.get('/:id', ArticleController.findById)

router.post('/', ArticleController.create)

router.post('/delete/:id', ArticleController.delete)

router.post('/update/:id', ArticleController.update)

module.exports = router
