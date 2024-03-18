const { Router } = require('express');
const { sendAccessRequest } = require('../controllers/account-setting/my-team/my-team.controller');

const myTeamRouter = Router();

myTeamRouter.post('/myteam', sendAccessRequest);

module.exports = myTeamRouter;
