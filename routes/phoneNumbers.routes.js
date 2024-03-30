'use strict';

const { Router } = require('express');
const getLocalNumbers = require('../controllers/phone-numbers/getLocalNumbers.controller');
const getTollFreeNumbers = require('../controllers/phone-numbers/getTollFreeNumbers.controller');
const getPhoneNumberSid = require('../controllers/phone-numbers/getPhoneNumberSid.controller');
const removePhoneNumber = require('../controllers/phone-numbers/removePhoneNumber.controller');
const purchaseSelectedNumber = require('../controllers/phone-numbers/purchaseSelectedNumber.controller');
const authenticateJWT = require('../middlewares/auth/authenticate-jwt');
const fetchPurchasedPhoneNumbers = require('../controllers/phone-numbers/fetchPurchasedPhoneNumbers');
const fetchDeletedPurchasedPhoneNumbers = require('../controllers/phone-numbers/fetchDeletedPurchasedPhoneNumbers');
const removePhoneNumberFromTwilio = require('../controllers/phone-numbers/removePhoneNumberFromTwilio');

const phoneNumbersRouter = Router();

phoneNumbersRouter.get('/fetch-purchased-numbers', authenticateJWT, fetchPurchasedPhoneNumbers);
phoneNumbersRouter.get('/fetch-deleted-purchased-numbers', authenticateJWT, fetchDeletedPurchasedPhoneNumbers);
phoneNumbersRouter.post('/local', getLocalNumbers);
phoneNumbersRouter.get('/toll-free', getTollFreeNumbers);
phoneNumbersRouter.get('/:phoneNumber', getPhoneNumberSid);
phoneNumbersRouter.delete('/:phoneNumber', authenticateJWT, removePhoneNumber);
phoneNumbersRouter.delete('/twilio/:phoneNumber', authenticateJWT, removePhoneNumberFromTwilio);
phoneNumbersRouter.post('/purchase', authenticateJWT, purchaseSelectedNumber);

module.exports = phoneNumbersRouter;
