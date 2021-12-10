const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/accountController');

router.get('/', accountController.list);
router.post('/add', accountController.add);

//change account status 
router.post('/active/:id',accountController.active)
router.post('/hiden/:id',accountController.hiden)

module.exports = router;