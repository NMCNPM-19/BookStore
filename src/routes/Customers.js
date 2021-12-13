const express = require('express');
const router = express.Router();
const customersController = require('../app/controllers/customersController');
const upload = require('../app/middlewares/uploadIMG/multer')


router.get('/recyclebin',customersController.recyclebin)
router.get('/', customersController.list);
router.get('/:id/edit',customersController.edit)
router.put('/:id/edit',customersController.update)
router.post('/add',customersController.add);
router.delete('/:id/del',customersController.delete)
router.patch('/:id/restore',customersController.restore);
router.delete('/:id/destroy',customersController.destroy)




module.exports = router;