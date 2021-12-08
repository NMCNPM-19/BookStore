const express = require('express');
const router = express.Router();
const profilecontroller = require("../app/controllers/profileController")

router.get('/', profilecontroller.show);
router.put('/saveUpdate/:id',profilecontroller.save);



module.exports = router