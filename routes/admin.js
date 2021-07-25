const router = require('express').Router()
const AdminController = require('../controllers/AdminController')

router.post('/register', AdminController.register)
router.post('/login', AdminController.login)
router.get('/', AdminController.listAdmin)

module.exports = router