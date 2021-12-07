const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.get('/', accountController.list);

router.post('/add', accountController.add);

module.exports = router;