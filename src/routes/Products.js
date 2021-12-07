const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/productController');
const upload = require('../app/middlewares/uploadIMG/multer');

/* GET home page. */


// add product
router.post('/store', upload.single('image'), ProductController.store);
// update product
router.get('/update/:id', ProductController.update);
router.put('/saveUpdate/:id', upload.single('image'),ProductController.saveUpdate);
//delete product
router.post('/hiden/:id', ProductController.hiden);
router.post('/active/:id', ProductController.active);
//list product
router.get('/', ProductController.list);
  
module.exports = router;