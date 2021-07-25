const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.createUser )
router.get('/list', UserController.listUser)
router.get('/detail/:userId', UserController.detailUser)
router.put('/updated/:userId', UserController.updatedUser)
router.delete('/delete/:userId', UserController.deleteUser)

module.exports = router