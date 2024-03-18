const { Router } = require('express');
const { sendAccessRequest } = require('../controllers/account-setting/my-team/send-access-request.controller');
const getMySupervisorsController = require('../controllers/account-setting/my-team/getMySupervisors.controller');
const getMyAgentsController = require('../controllers/account-setting/my-team/getMyAgents.controller');
const removeAccessFromMyTeam = require('../controllers/account-setting/my-team/removeAccessFromMyTeam');


const myTeamRouter = Router();

myTeamRouter.post('/send-access-request', sendAccessRequest);
myTeamRouter.get('/get-my-supervisors/:user', getMySupervisorsController);
myTeamRouter.get('/get-my-agents/:user', getMyAgentsController);
myTeamRouter.put('/remove-access-request/:user', removeAccessFromMyTeam);

module.exports = myTeamRouter;
