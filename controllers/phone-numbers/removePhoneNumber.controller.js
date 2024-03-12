'use strict';
const { env } = require('process');

const removePhoneNumber = async (req, res, next) => {
	try {    
    const { sid } = req.params;

    //Create a Twilio client
    const client = require('twilio')(
      env.TWILIO_ACCOUNT_SID,
      env.TWILIO_AUTH_TOKEN
    );


        return client.incomingPhoneNumbers(sid)
        .remove()
        .then(() => {
            return res.status(200).send({
                code: res.statusCode,
                message: 'Phone number removed successfully',
            });
        }).catch((error) => {
            return res.status(400).send({
                code: res.statusCode,
                error: { message: error.message },
            });
        });
   

	} catch (error) {
    return res.status(500).send({
      code: 500,
      error: { message: 'An internal server error occurred' },
    });
	}
};

module.exports = removePhoneNumber;
