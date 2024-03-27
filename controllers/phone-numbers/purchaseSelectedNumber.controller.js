'use strict';
const { env } = require('process');

const purchaseSelectedPhoneNumber = async (req, res, next) => {
	try {    
    const { phoneNumber } = req.body;

    //Create a Twilio client
    const client = require('twilio')(
      env.TWILIO_ACCOUNT_SID,
      env.TWILIO_AUTH_TOKEN
    );
   
    //Purchase selected phone number
    client.incomingPhoneNumbers.create({
        phoneNumber,
    })
    .then((number) => {
        return res.status(200).send({
            code: res.statusCode,
            message: 'Phone number purchased successfully',
            number,
        });
        }
    ).catch((error) => {
        return res.status(400).send({
            code: res.statusCode,
            error: { message: error.message },
        });
    }
    );


	} catch (error) {
    return res.status(500).send({
      code: 500,
      error: { message: 'An internal server error occurred' },
    });
	}
};

module.exports = purchaseSelectedPhoneNumber;
