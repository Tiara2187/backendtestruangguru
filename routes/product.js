const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const AdminAuth = require('../helpers/authentication')

router.post('/create', AdminAuth,ProductController.createProduct)
router.get('/list', AdminAuth,ProductController.listProduct)
router.get('/detail/:productId', AdminAuth,ProductController.detailProduct)
router.put('/updated/:productId', AdminAuth,ProductController.updatedProduct)
router.delete('/delete/:productId', AdminAuth,ProductController.deleteProduct)

module.exports = router