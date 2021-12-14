const express = require('express');
const router = express.Router();
const profileController = require("../app/controllers/user/profileController")
const passwdContronler = require("../app/controllers/user/passwdController")

router.get('/profile', profileController.show);
// router.put('/profile/saveUpdate/:id',profileController.save);

router.get('/changePasswd', passwdContronler.show);
router.put('/changePasswd/:id', passwdContronler.change)

module.exports = router