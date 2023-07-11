const router = require('express').Router();
const { getCustomer } = require('../controllers/customer');

router.get('/', getCustomer);

module.exports = router;