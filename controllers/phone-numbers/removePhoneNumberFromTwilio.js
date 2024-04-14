'use strict';
const { env } = require('process');
const { deletePurchasedPhoneNumbersFromDbFunc } = require('../../services/purchase-phone-number.service');
const { deletePhoneNumberFuncTwilio } = require('../../services/twilio.service');

const removePhoneNumberFromTwilio = async (req, res, next) => {
	try {
		const { phoneNumber } = req.params;
		const user = req.user;
		if (user.role !== 'CRM_ADMIN' && user.role !== 'CRM_COMPANY_ADMIN' && user.role !== 'CRM_MANAGER') {
			return res.status(403).send({
				code: 403,
				message: 'Unauthorized: Insufficient permissions'
			});
		}
		await deletePhoneNumberFuncTwilio(phoneNumber);
		const responseUpdated = await deletePurchasedPhoneNumbersFromDbFunc(phoneNumber);
		return res.status(200).send({
			code: res.statusCode,
			message: 'Phone number removed successfully',
			response: responseUpdated
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			code: 500,
			error: { message: 'An internal server error occurred' }
		});
	}
};

module.exports = removePhoneNumberFromTwilio;

