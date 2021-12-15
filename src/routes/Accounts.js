const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/accountController');
const upload = require('../app/middlewares/uploadIMG/multer')


router.get('/recyclebin',accountController.recyclebin)
router.get('/', accountController.list);
router.get('/:id/edit',accountController.edit)
router.put('/:id/edit',accountController.update)
router.post('/add',upload.single('image'),accountController.add);
router.delete('/:id/del',accountController.delete)
router.patch('/:id/restore',accountController.restore);
router.post('/:id/reset',accountController.reset);
router.delete('/:id/destroy',accountController.destroy)




module.exports = router;