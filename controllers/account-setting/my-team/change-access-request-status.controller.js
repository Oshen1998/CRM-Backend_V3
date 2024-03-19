'use strict';
const MyTeamModel = require('../../../models/my-team.model');
const { getAccessRequests } = require('../../../services/myteam.service');

const changeAccessRequestStatus = async (req, res, next) => {
	try {
		MyTeamModel.findOneAndUpdate(
			{ 'team._id': req.params.id },
			{ $set: { 'team.$.status': req.body.status } }, // Update to set the new status value
			{ new: true } // Option to return the updated document
		)
			.exec()
			.then(async (updatedTeam) => {
				console.log('Updated team:', updatedTeam);
				const data = await getAccessRequests(req.params.user);
				return res.status(200).send({
					code: res.statusCode,
					message: data ? 'Updated status successful' : 'Updated status unsuccessful',
					requests: data
				});
			})
			.catch((error) => {
				console.error('Error occurred:', error);
				return res.status(500).send({
					code: res.statusCode,
					message: 'Something went wrong',
					error: { message: error.message }
				});
			});
	} catch (error) {
		console.error('Error occurred:', error);
		return res.status(500).send({
			code: res.statusCode,
			message: 'Something went wrong',
			error: { message: error.message }
		});
	}
};

module.exports = changeAccessRequestStatus;