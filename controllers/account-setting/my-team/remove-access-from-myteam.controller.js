'use strict';
const MyTeamModel = require('../../../models/my-team.model');
const UserModel = require('../../../models/user.model');
const { getSupervisorsListForMyTeam, getAgentsListForMyTeam } = require('../../../services/myteam.service');
const { addNotificationFunc } = require('../../../services/notification.service');

const removeAccessFromMyTeam = async (req, res, next) => {
	try {
		console.log('Removing')
		const { user } = req.params;
		const { disconnectUserId } = req.body;
		const currentUserDetails = await UserModel.findById(user);

		const myTeam = await MyTeamModel.findOne({ user }).populate({
			path: 'team.user',
			select: 'email'
		});

		if (myTeam) {
			const filteredUserList = myTeam.team.filter(
				(item) => !item.user._id.equals(disconnectUserId)
			);
			MyTeamModel.findOneAndUpdate({ user }, { team: filteredUserList }, { new: true })
				.then(async (response) => {

					await addNotificationFunc(disconnectUserId, `${currentUserDetails.firstName} ${currentUserDetails.lastName} removed my team access from you`);

					const supervisorList = await getSupervisorsListForMyTeam(user);
					const agentList = await getAgentsListForMyTeam(user);
				
					res.status(200).send({
						code: res.statusCode,
						message: response,
						supervisors: supervisorList,
						agents: agentList
					});
				})
				.catch((error) => {
					res.status(400).send({
						code: res.statusCode,
						message: error.message
					});
				});
		} else {
			res.status(400).send({
				code: res.statusCode,
				message: 'No Team Found'
			});
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send({
			code: 500,
			message: 'Something went wrong',
			error: { message: error.message }
		});
	}
};

module.exports = removeAccessFromMyTeam;

