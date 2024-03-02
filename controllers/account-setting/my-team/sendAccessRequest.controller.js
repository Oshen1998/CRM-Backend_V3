'use strict';

const accessRequestModel = require('../../models/accessRequest.model');
const userModel = require('../../models/user.model');

const sendAccessRequestController = async (req, res, next) => {
	try {
		const { emails } = req.body;
        const { id } = req.params;

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
        
            await accessRequestModel.create({ supervisor: id, agent: user._id });

            //send emails to the users

            //send email to the users
        }));
        

        return res.status(201).send({
            code: res.statusCode,
            message: 'access request sent successfully',
        });



	} catch (error) {
    return res.status(500).send({
      code: 500,
      error: { message: 'An internal server error occurred' },
    });
	}
};

module.exports = sendAccessRequestController;
