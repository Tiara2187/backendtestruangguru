const router = require('express').Router()
const PackagesController = require('../controllers/PackagesController')
const AdminAuth = require('../helpers/authentication')

router.post('/create', AdminAuth,PackagesController.createPackages)
router.get('/list', AdminAuth, PackagesController.listPackages)
router.get('/detail/:packagesId', AdminAuth, PackagesController.detailPackages)
router.put('/updated/:packagesId', AdminAuth,PackagesController.updatedPackages)
router.delete('/delete/:packagesId', AdminAuth, PackagesController.deletePackages)

module.exports = router