const express = require('express');
const router = express.Router();
const sellingController = require('../app/controllers/sellingController');


router.get('/',sellingController.list)

module.exports =router;