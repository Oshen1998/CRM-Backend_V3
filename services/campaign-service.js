const CampaignModel = require('../models/campaign.model');

const createCampaignFunc = async (
	user,
	campaignName,
	date,
	time,
	isScheduled,
	isSendText,
	isSendEmail,
	message,
	email
) => {
	try {
		return await CampaignModel.create({
			user,
			campaignName,
			date,
			time,
			isScheduled,
			isSendText,
			isSendEmail,
			message,
			email
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

const fetchCampaignsByUserFunc = async (user) => {
	try {
		const campaigns = await CampaignModel.find({ user });
		if(campaigns.length){
			return campaigns.map((campaign) => {
				return {
					campaignName: campaign.campaignName,
					type: campaign.isSendEmail &&  campaign.isSendText ? 'SMS & Email Campaign' : campaign.isSendEmail ?  'Email Campaign' :  'SMS Campaign',
					sentAt: campaign.date ,
					createdAt: campaign.createdAt,
					estimatedCost: campaign.estimatedCost,
					email: {
						title: campaign.email?.title,
						body: campaign.email?.body
					},
					message: campaign.message,
					totalLeadsReached: campaign.totalLeadsReached,
					totalLeadsResponded: campaign.totalLeadsResponded,
					responseRate: campaign.responseRate,
					totalCarrierViolations: campaign.totalCarrierViolations
				};
			});
		}else{
			return []
		}
	
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { createCampaignFunc, fetchCampaignsByUserFunc };

