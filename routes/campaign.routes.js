const { Router } = require('express');
const { createCampaign } = require('../controllers/campaign');
const { fetchCampaignsByUser } = require('../controllers/campaign/fetch-campaigns-by-user');
const authenticateJWT = require('../middlewares/auth/authenticate-jwt');

const campaignRouter = Router();

campaignRouter.post('/create-campaign', authenticateJWT, createCampaign);
campaignRouter.get('/fetch-campaigns-user', authenticateJWT, fetchCampaignsByUser);

module.exports = campaignRouter;
