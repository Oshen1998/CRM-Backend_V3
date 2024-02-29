'use strict';

const { Router } = require('express');
const userController = require('../../../../controllers/account-setting/genaral/genral-info/genral-info.controller');
const checkAuth = require('../../../../middlewares/checkAuth.middleware');

const userRouter = Router();

// Route to create a new user
userRouter.post('/create', checkAuth, userController.createUser);

// Route to get all users
userRouter.get('/all', checkAuth, userController.getAllUsers);

// Route to get a user by ID
userRouter.get('/:id', checkAuth, userController.getUserById);

// Route to update a user
userRouter.put('/:id/update', checkAuth, userController.updateUser);

// Route to delete a user
userRouter.delete('/:id/delete', checkAuth, userController.deleteUser);

module.exports = userRouter;
