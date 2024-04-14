'use strict';
const MyTeamModel = require('../../../models/my-team.model');
const { getAccessRequests } = require('../../../services/myteam.service');
const { addNotificationFunc } = require('../../../services/notification.service');

//Remaining to implement
const removeMyTeamAccessRequestByAgentOrSupervisor = async (req, res, next) => {
	try {
		const { documentId, requestId } = req.body;
		const user = req.user;

		if (user.role !== 'CRM_ADMIN' && user.role !== 'CRM_SUPERVISOR') {
			return res.status(403).send({
				code: 403,
				message: 'Unauthorized: Only users with role CRM_ADMIN or CRM_SUPERVISOR can remove access requests'
			});
		}


		MyTeamModel.findOneAndUpdate(
			{ _id: documentId },
			{ $pull: { team: { user: user.id, _id: requestId } } },
			{ new: true }
		)
			.then(async (response) => {
				console.log(response)
				await addNotificationFunc(response.user._id, `${user.username}  removed access from your my team`)
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

module.exports = removeMyTeamAccessRequestByAgentOrSupervisor;

