'use strict';

const { Router } = require('express');
const loginController = require('../controllers/auth/login.controller');
const registerController = require('../controllers/auth/register.controller');
const updateController = require('../controllers/auth/update.controller');

const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.put('/update/:id', updateController);

module.exports = authRouter;
