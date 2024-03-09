'use strict';

const { Router } = require('express');
const sendAccessRequestController = require('../controllers/account-setting/my-team/sendAccessRequest.controller');
const getMySupervisorsController = require('../controllers/account-setting/my-team/getMySupervisors.controller');
const getMyAgentsController = require('../controllers/account-setting/my-team/getMyAgents.controller');
const activateAccessRequest = require('../controllers/account-setting/my-team/activateAccessRequest.controller');

const authRouter = Router();

authRouter.post('/send-access-request/:id', sendAccessRequestController);
authRouter.get('/get-my-supervisors/:id', getMySupervisorsController);
authRouter.get('/get-my-agents/:id', getMyAgentsController);
authRouter.get('/activate/:token', activateAccessRequest);


module.exports = authRouter;
