'use strict';
const { addNotificationFunc } = require('../../services/notification.service');

const addNotification = async (req, res, next) => {
	const { user, content } = req.body;
	try {
		const data = await addNotificationFunc(user, content);
		return res.status(200).send({
			code: res.statusCode,
			message: 'Notification added',
			notification: data
		});
	} catch (error) {
		console.error(error.message);
		res
			.status(500)
			.send({ code: 500, message: 'Something went wrong', error: { message: error.message } });
	}
};

module.exports = {
	addNotification
};

