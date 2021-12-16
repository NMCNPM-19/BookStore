const express = require('express');
const router = express.Router();
const cartcontroller = require('../app/controllers/cartcontroller')


router.get('/',cartcontroller.cartList)
router.get('/add/:LOAINV/:id',cartcontroller.add)
router.get('/remove/:id',cartcontroller.remove)


module.exports = router