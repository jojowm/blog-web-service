const router = require('koa-router')()
const ArticleController = require('../controllers/article')

router.prefix('/article')

router.get('/list', ArticleController.finaAll)

router.get('/:id', ArticleController.findById)

router.post('/', ArticleController.create)

router.post('/delete/:id', ArticleController.delete)

module.exports = router
