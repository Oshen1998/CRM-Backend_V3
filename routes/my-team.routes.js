const { Router } = require('express');
const { sendAccessRequest } = require('../controllers/account-setting/my-team/send-access-request.controller');
const getMySupervisorsController = require('../controllers/account-setting/my-team/getMySupervisors.controller');
const getMyAgentsController = require('../controllers/account-setting/my-team/getMyAgents.controller');

const myTeamRouter = Router();

myTeamRouter.post('/send-access-request', sendAccessRequest);
myTeamRouter.get('/get-my-supervisors/:user', getMySupervisorsController);
myTeamRouter.get('/get-my-agents/:user', getMyAgentsController);

module.exports = myTeamRouter;
