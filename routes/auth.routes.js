'use strict';

const { Router } = require('express');
const loginController = require('../controllers/auth/login.controller');
const registerController = require('../controllers/auth/register.controller');
const updateController = require('../controllers/auth/update.controller');

const AuthValidation = require('../middlewares/validations/auth.validations');
const validateSchema = require('../helpers/joiValidation');

const authRouter = Router();

authRouter.post('/login', validateSchema({ body: AuthValidation.loginSchema }), loginController);
authRouter.post('/register', registerController);
authRouter.put('/update/:id', updateController);

module.exports = authRouter;
