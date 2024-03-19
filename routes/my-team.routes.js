const { Router } = require('express');
const { sendAccessRequest } = require('../controllers/account-setting/my-team/send-access-request.controller');
const getMySupervisorsController = require('../controllers/account-setting/my-team/getMySupervisors.controller');
const getMyAgentsController = require('../controllers/account-setting/my-team/getMyAgents.controller');
const removeAccessFromMyTeam = require('../controllers/account-setting/my-team/removeAccessFromMyTeam');
const fetchAccessRequests = require('../controllers/account-setting/my-team/fetch-acces-requests.controller');


const myTeamRouter = Router();

myTeamRouter.post('/send-access-request', sendAccessRequest);
myTeamRouter.get('/get-my-supervisors/:user', getMySupervisorsController);
myTeamRouter.get('/fetch-access-request/:user', fetchAccessRequests);
myTeamRouter.get('/get-my-agents/:user', getMyAgentsController);
myTeamRouter.put('/remove-access-request/:user', removeAccessFromMyTeam);

module.exports = myTeamRouter;
