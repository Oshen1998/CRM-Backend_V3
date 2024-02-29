'use strict';
const { Router } = require('express');
const indexController = require('../controllers/index.controller');
const authRouter = require('./auth.routes');
const profileRouter = require('./profile.routes');
//const GenralInfoRouter = require('./account-setting/genaral/genaral-info/genaral-info.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
//router.use('/genral-info', GenralInfoRouter);

router.get('/', indexController);

module.exports = router;
