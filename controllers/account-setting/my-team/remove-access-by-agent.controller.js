'use strict';
const MyTeamModel = require('../../../models/my-team.model');
const { getAccessRequests } = require('../../../services/myteam.service');

//Remaining to implement
const removeMyTeamAccessRequestByAgent = async (req, res, next) => {
	try {
		const { documentId, requestId } = req.body;
		const user = req.user;
		
		MyTeamModel.findOneAndUpdate(
			{ _id: documentId },
			{ $pull: { team: { user: user.id, _id: requestId } } },
			{ new: true }
		)
			.then(async () => {
				const data = await getAccessRequests(user.id);
				return res.status(200).send({
					code: res.statusCode,
					message: 'Removed Access Request successfully',
					requests: data
				});
			})
			.catch((error) => {
				throw new Error(error);
			});
	} catch (error) {
		console.error(error.message);
		res.status(500).send({
			code: 500,
			message: 'Something went wrong',
			error: { message: error.message }
		});
	}
};

module.exports = removeMyTeamAccessRequestByAgent;

