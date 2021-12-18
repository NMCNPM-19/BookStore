const express = require('express');
const router = express.Router();
const storageController = require('../app/controllers/storageController');
const upload = require('../app/middlewares/uploadIMG/multer')

router.get('/',storageController.list)
router.get('/print',storageController.printMonth)

module.exports =router;