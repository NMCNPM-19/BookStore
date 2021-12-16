const express = require('express');
const router = express.Router();
const importController = require('../app/controllers/importController');

/* GET home page. */

// add order
router.post('/add', importController.add);
// view order
router.get('/view/:id', importController.view);
//list product
router.get('/', importController.list);
  
module.exports = router;