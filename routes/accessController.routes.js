'use strict';

const { Router } = require('express');
const sendAccessRequestController = require('../controllers/accessController/sendAccessRequest.controller');
const getMySupervisorsController = require('../controllers/accessController/getMySupervisors.controller');
const getMyAgentsController = require('../controllers/accessController/getMyAgents.controller');

const authRouter = Router();

authRouter.post('/sendAccessRequest/:id', sendAccessRequestController);
authRouter.get('/getMySupervisors/:id', getMySupervisorsController);
authRouter.get('/getMyAgents/:id', getMyAgentsController);


module.exports = authRouter;
