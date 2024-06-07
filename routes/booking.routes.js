'use strict';
const { Router } = require('express');
const makeAnAppointmentController = require('../controllers/account-setting/appointmentBooking/scheduleMeeting');
const uploads = require('../utils/uploader');
const authenticateJWT = require('../middlewares/auth/authenticate-jwt');

const bookingRouter = Router();

bookingRouter.post('/appointment-details', uploads.single('logo') ,authenticateJWT, makeAnAppointmentController);

module.exports = bookingRouter;
