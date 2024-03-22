const { Router } = require('express');
const { sendAccessRequest } = require('../controllers/account-setting/my-team/send-access-request.controller');
const getMySupervisorsController = require('../controllers/account-setting/my-team/get-my-supervisors.controller');
const getMyAgentsController = require('../controllers/account-setting/my-team/get-my-agents.controller');
const removeAccessFromMyTeam = require('../controllers/account-setting/my-team/remove-access-from-myteam.controller');
const fetchAccessRequests = require('../controllers/account-setting/my-team/fetch-acces-requests.controller');
const changeAccessRequestStatus = require('../controllers/account-setting/my-team/change-access-request-status.controller');

const myTeamRouter = Router();

myTeamRouter.post('/send-access-request', sendAccessRequest);
myTeamRouter.get('/get-my-supervisors/:user', getMySupervisorsController);
myTeamRouter.get('/fetch-access-request/:user', fetchAccessRequests);
myTeamRouter.get('/get-my-agents/:user', getMyAgentsController);
myTeamRouter.put('/remove-access-request/:user', removeAccessFromMyTeam);
myTeamRouter.put('/change-access-request-status/:user/:id', changeAccessRequestStatus);

module.exports = myTeamRouter;
