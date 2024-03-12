'use strict';
const { Router } = require('express');
const indexController = require('../controllers/index.controller');
const authRouter = require('./auth.routes');
const profileRouter = require('./profile.routes');
const myTeamRouter = require('./accessController.routes');
const phoneNumbersRouter = require('./phoneNumbers.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/my-team', myTeamRouter);
router.use('/phone-numbers', phoneNumbersRouter);

router.get('/', indexController);

module.exports = router;
