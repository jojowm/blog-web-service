const router = require('koa-router')()
const ArticleController = require('../controllers/article')

router.prefix('/article')

router.get('/list', ArticleController.findAll)

router.post('/', ArticleController.create)

router.post('/delete/:id', ArticleController.delete)
// router.delete('/:id', ArticleController.delete)

router.post('/update/:id', ArticleController.update)
// router.put('/:id', ArticleController.update)

router.get('/query', ArticleController.findByTitle)

router.get('/:id', ArticleController.findById)

module.exports = router
