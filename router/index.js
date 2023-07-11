const router = require('express').Router();

const userRouter = require('./user')
const customerRouter = require('./customer')

router.use('/user', userRouter)
router.use('/customer', customerRouter)

module.exports = router;