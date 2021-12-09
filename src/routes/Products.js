const express = require('express');
const router = express.Router();
const ProductController = require('../app/controllers/productController');
const upload = require('../app/middlewares/uploadIMG/multer');

/* GET home page. */

// add product
router.post('/store', upload.single('image'), ProductController.store);
// update product
router.delete('/:id/del',ProductController.delete)
router.get('/update/:id', ProductController.update);
router.put('/saveUpdate/:id', upload.single('image'),ProductController.saveUpdate);
//list product
router.get('/', ProductController.list);
  
module.exports = router;