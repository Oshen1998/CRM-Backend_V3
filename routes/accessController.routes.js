'use strict';

const { Router } = require('express');
const sendAccessRequestController = require('../controllers/account-setting/my-team/send-access-request.controller');
const getMySupervisorsController = require('../controllers/account-setting/my-team/get-my-supervisors.controller');
const getMyAgentsController = require('../controllers/account-setting/my-team/get-my-agents.controller');
const activateAccessRequest = require('../controllers/account-setting/my-team/activate-access-request.controller');

const authRouter = Router();

authRouter.post('/send-access-request/:id', sendAccessRequestController);
authRouter.get('/get-my-supervisors/:id', getMySupervisorsController);
authRouter.get('/get-my-agents/:id', getMyAgentsController);
authRouter.get('/activate/:token', activateAccessRequest);

module.exports = authRouter;
