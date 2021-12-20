const express = require('express');
const router = express.Router();
const cartcontroller = require('../app/controllers/cartcontroller')

router.get('/resfesh', cartcontroller.resfesh)
router.get('/update-quantity',cartcontroller.update)
router.get('/',cartcontroller.cartList)
router.post('/add',cartcontroller.add)
router.get('/remove/:id',cartcontroller.remove)


module.exports = router