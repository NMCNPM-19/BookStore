const express = require('express');
const indexRouter = require("./index");
const authRouter = require("../auth/authRouter");
const router = express.Router();

router.use('/dashboard', indexRouter);
router.use('/', authRouter);

module.exports = router