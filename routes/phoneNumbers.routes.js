'use strict';

const { Router } = require('express');
const getLocalNumbers = require('../controllers/phone-numbers/getLocalNumbers.controller');
const getTollFreeNumbers = require('../controllers/phone-numbers/getTollFreeNumbers.controller');
const getPhoneNumberSid = require('../controllers/phone-numbers/getPhoneNumberSid.controller');
const removePhoneNumber = require('../controllers/phone-numbers/removePhoneNumber.controller');
const purchaseSelectedNumber = require('../controllers/phone-numbers/purchaseSelectedNumber.controller');


const phoneNumbersRouter = Router();

phoneNumbersRouter.get('/local', getLocalNumbers);
phoneNumbersRouter.get('/toll-free', getTollFreeNumbers);
phoneNumbersRouter.get('/:phoneNumber', getPhoneNumberSid);
phoneNumbersRouter.delete('/:sid', removePhoneNumber);
phoneNumbersRouter.post('/purchase', purchaseSelectedNumber);

module.exports = phoneNumbersRouter;
