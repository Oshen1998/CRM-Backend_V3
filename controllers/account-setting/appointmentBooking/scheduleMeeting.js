'use strict';
const AppointmentModel = require('../../../models/appointment.model');
const dynamicRouteModel = require('../../../models/dynamicRoutes.model');
const handler = require('../../../helpers/errorHandleHelpers/index');

const makeAnAppointmentController = async (req, res) => {
	try {
		const {
			initialDetails,
			appointmentDetails,
			additionalFields,
			appearanceDetails,
			availability,
			notificationDetails
		} = req.body;

		// Parse details from request body
		const parsedInitialDetails = JSON.parse(initialDetails);
		const parsedAppointmentDetails = JSON.parse(appointmentDetails);
		const parsedAdditionalFields = JSON.parse(additionalFields);
		const parsedAppearanceDetails = JSON.parse(appearanceDetails);
		const parsedNotificationDetails = JSON.parse(notificationDetails);
		const parsedAvailability = JSON.parse(availability);

		// Get identityId from authenticated user
		const identityId = req.user.id;

		// Check if appointment already exists
		const existAppointment = await AppointmentModel.findOne({ identityID: identityId });
		let logoUri;
		if (req.file) {
			logoUri = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
		}

		const payload = {
			pageLogo: logoUri,
			identityID: identityId,
			initialDetails: parsedInitialDetails,
			appointmentDetails: parsedAppointmentDetails,
			additionalFields: parsedAdditionalFields,
			appearanceDetails: parsedAppearanceDetails,
			availability: parsedAvailability,
			notifications: parsedNotificationDetails
		};

		let responseMessage;
		let appointmentData;

		if (!existAppointment) {
			// Create a new appointment
			appointmentData = new AppointmentModel(payload);
			responseMessage = 'Successfully Added!';
			const routePayload = {
				identityID: identityId,
				pathName: payload.initialDetails?.bookingPageLink
			};
			await new dynamicRouteModel(routePayload).save();
		} else {
			// Update the existing appointment
			appointmentData = await AppointmentModel.findByIdAndUpdate(existAppointment._id, payload, {
				new: true
			});
			responseMessage = 'Updated Successfully!';
			await dynamicRouteModel.findOneAndUpdate(
				{ identityID: identityId },
				{ pathName: payload.initialDetails?.bookingPageLink },
				{
					new: true
				}
			);
		}

		const result = await appointmentData.save();
		handler.successResponseHandler(res, result, responseMessage);
	} catch (error) {
		handler.unprocessableEntityResponseHandler(res);
	}
};

module.exports = makeAnAppointmentController;
