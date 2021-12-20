const express = require('express');
const router = express.Router();
const billController = require('../app/controllers/billController');

//list bill
router.get('/', billController.list)
// add order
router.post('/add', billController.add);
// view order
router.get('/view/:id', billController.view);
  
//print order
router.get('/print/:id', billController.print);

module.exports = router;