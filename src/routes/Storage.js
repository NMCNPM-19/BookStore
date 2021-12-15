const express = require('express');
const router = express.Router();
const storageController = require('../app/controllers/storageController');
const upload = require('../app/middlewares/uploadIMG/multer')

router.get('/',storageController.list)

module.exports =router;