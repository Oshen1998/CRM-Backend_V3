'use strict';
const { Router } = require('express');
const makeAnAppointmentController = require('../controllers/account-setting/appointmentBooking/scheduleMeeting');
const getBookingDetails = require('../controllers/account-setting/appointmentBooking/getScheduled');
const uploads = require('../utils/uploader');
const authenticateJWT = require('../middlewares/auth/authenticate-jwt');

const bookingRouter = Router();

bookingRouter.post(
	'/appointment-details',
	uploads.single('logo'),
	authenticateJWT,
	makeAnAppointmentController
);
bookingRouter.get('/existing-path/:name', getBookingDetails.validateExistingPath);
bookingRouter.get('/get/appointment', authenticateJWT, getBookingDetails.getScheduledMeetingData);

module.exports = bookingRouter;
