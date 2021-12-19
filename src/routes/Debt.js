const express = require('express');
const router = express.Router();
const debtController = require('../app/controllers/debtController');
const upload = require('../app/middlewares/uploadIMG/multer')

router.get('/',debtController.list)
router.get('/print',debtController.printMonth)
router.get('/info/:id',debtController.info)
router.post('/:id/add',debtController.add)
router.post('/:id/pay',debtController.pay)
module.exports =router;