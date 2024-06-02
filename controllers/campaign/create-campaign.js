'use strict';
const { createCampaignFunc } = require('../../services/campaign-service');

const createCampaign = async (req, res, next) => {
	const { name, date, time, isScheduled, isSendText, isSendEmail, message, estimatedCost } =
		req.body;
	const user = req.user;
	try {
		const data = await createCampaignFunc(
			user.id,
			name,
			date,
			time,
			isScheduled,
			isSendText,
			isSendEmail,
			message,
			estimatedCost
		);
        
        //Need to implement cron job for send emails or sms for a specific time

		return res.status(200).send({
			code: res.statusCode,
			message: 'Campaign Created',
			campaign: data
		});
	} catch (error) {
		console.error(error.message);
		res
			.status(500)
			.send({ code: 500, message: 'Something went wrong', error: { message: error.message } });
	}
};

module.exports = {
	createCampaign
};

