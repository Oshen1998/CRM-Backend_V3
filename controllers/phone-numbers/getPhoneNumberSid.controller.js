'use strict';
const { env } = require('process');

const getPhoneNumberSid = async (req, res, next) => {
	try {    
    const { phoneNumber } = req.params;

    //Create a Twilio client
    const client = require('twilio')(
      env.TWILIO_ACCOUNT_SID,
      env.TWILIO_AUTH_TOKEN
    );

    //Retrieve phone number SID
    client.incomingPhoneNumbers.list({ phoneNumber: phoneNumber })
    .then((number) => {
        return res.status(200).send({
            code: res.statusCode,
            message: 'Phone number SID retrieved successfully',
            number,
        });
        }
    )
   

	} catch (error) {
    return res.status(500).send({
      code: 500,
      error: { message: 'An internal server error occurred' },
    });
	}
};

module.exports = getPhoneNumberSid;
