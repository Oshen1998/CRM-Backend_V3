// const getScheduledMeetingData = async (req, res) => {
// 	try {

// 		const identityId = req.user.id;
// 		const existAppointment = await AppointmentModel.findOne({ identityID: identityId });

// 		if(existAppointment){
// 			handler.successResponseHandler(res, result, existAppointment);
// 			return;
// 		}
// 		handler.notFoundResponseHandler(res, 'Not Found Data!');
// 	} catch (error) {
// 		console.log(error);
// 		handler.unprocessableEntityResponseHandler(res, error.message || 'Unprocessable Entity');
// 	}
// };