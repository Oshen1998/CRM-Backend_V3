const { Router } = require('express');
const { sendAccessRequest } = require('../controllers/account-setting/my-team/send-access-request.controller');

const myTeamRouter = Router();

myTeamRouter.post('/send-access-request', sendAccessRequest);

module.exports = myTeamRouter;
