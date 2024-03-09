'use strict';

const accessRequestModel = require('../../../models/accessRequest.model');
const userModel = require('../../../models/user.model');
const sendMail = require('../../../utils/sendEmails.utils');

const sendAccessRequestController = async (req, res, next) => {
	try {
		const { emails } = req.body;
        const { id } = req.params;

        let count = 0;

        let user = await userModel.findOne ({ _id: id });

        if (!user){
            return res.status(404).send({
                code: res.statusCode,
                message: 'user not found',
            });
        }

        let users = await userModel.find ({ email: { $in: emails } });

        //add access request to each user with the user id as the agent and my id as the supervisor if that record already available remove that and add new record

        await Promise.all(users.map(async (user) => {
            let accessRequest = await accessRequestModel.findOne({ supervisor: id, agent: user._id });
        
            if (accessRequest) {
                await accessRequestModel.deleteOne({ supervisor: id, agent: user._id });
            }

           // Generate activation token
            const token = crypto.randomBytes(20).toString('hex');
        
            await accessRequestModel.create({ supervisor: id, agent: user._id, token: token});

             // Send activation email
             const activationLink = `https://crm-backend-v3.onrender.com/my-team/activate/${token}`;

            //send emails to the users

            const result = await sendMail(user.email, 'Access Request', `You have received an access request from ${user.fullname} to join their team. Click here to accept the request ${activationLink}`);

            if (result) {
                count++;
            }

            //send email to the users
        }));
        

        return res.status(201).send({
            code: res.statusCode,
            message: `access request sent to ${count} mails successfully`,
        });



	} catch (error) {
        console.error('Error during sending access request:', error);
    return res.status(500).send({
      code: 500,
      error: { message: 'An internal server error occurred' },
    });
	}
};

module.exports = sendAccessRequestController;
