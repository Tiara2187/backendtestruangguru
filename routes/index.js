const router = require('express').Router()
const adminRoutes = require('./admin')
const packagesRoutes = require('./packages')
const productRoutes = require('./product')
const userRoutes = require('./user')

const errorHandlers = require('../helpers/errorHandlers')

router.use('/admin', adminRoutes)
router.use('/packages', packagesRoutes)
router.use('/product', productRoutes)
router.use('/user', userRoutes)

router.use(errorHandlers)
module.exports = router