const express = require('express');
const router = express.Router();
const ruleController = require('../app/controllers/ruleController');
const upload = require('../app/middlewares/uploadIMG/multer')

router.get('/',ruleController.edit)
router.put('/edit',ruleController.update)

module.exports =router;