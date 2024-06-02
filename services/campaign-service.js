const CampaignModel = require('../models/campaign.model');

const createCampaignFunc = async (
	user,
	name,
	date,
	time,
	isScheduled,
	isSendText,
	isSendEmail,
	message,
	estimatedCost
) => {
	try {
		return await CampaignModel.create({
			user,
			name,
			date,
			time,
			isScheduled,
			isSendText,
			isSendEmail,
			message,
			estimatedCost
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				throw new Error(error);
			});
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { createCampaignFunc };

