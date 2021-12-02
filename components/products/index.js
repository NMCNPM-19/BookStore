var express = require('express');
var router = express.Router();
const ProductController = require('./productController');
const upload = require('../upload/multer');

/* GET home page. */


// add product
router.post('/store', upload.single('image'), ProductController.store);

// update product
router.get('/update/:id', ProductController.update);
router.put('/saveUpdate/:id', ProductController.saveUpdate);

//delete product
router.post('/hiden/:id', ProductController.hiden);
router.post('/active/:id', ProductController.active);

//list product
router.get('/', ProductController.list);
  
module.exports = router;