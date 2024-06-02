const { Router } = require('express');
const { createCampaign } = require('../controllers/campaign');
const authenticateJWT = require('../middlewares/auth/authenticate-jwt');

const campaignRouter = Router();

campaignRouter.post('/create-campaign', authenticateJWT, createCampaign);

module.exports = campaignRouter;
