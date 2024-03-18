'use strict';

const accessRequestModel = require('../../../models/accessRequest.model');

const getMyAgentsController = async (req, res, next) => {
	try {
		const { id } = req.params;

		//get all the access requests where the agent is me and status is accepted
		let accessRequests = await accessRequestModel
			.find({ supervisor: id, status: 'accepted' })
			.populate('agent', 'fullname email');

		if (accessRequests.length === 0) {
			return res.status(404).send({
				code: res.statusCode,
				message: 'no agents found'
			});
		}

		return res.status(200).send({
			code: res.statusCode,
			message: 'agents found',
			agents: accessRequests
		});
	} catch (error) {
		return res.status(500).send({
			code: 500,
			error: { message: 'An internal server error occurred' }
		});
	}
};

module.exports = getMyAgentsController;
