'use strict';
const MyTeamModel = require('../../../models/my-team.model');
const { getSupervisorsListForMyTeam, getAgentsListForMyTeam } = require('../../../services/myteam.service');

//Remaining to implement
const removeAccessByUser = async (req, res, next) => {
	try {
		if (myTeam) {
			const filteredUserList = myTeam.team.filter(
				(item) => !item.user._id.equals(disconnectUserId)
			);
			MyTeamModel.findOneAndUpdate({ user }, { team: filteredUserList }, { new: true })
				.then(async (response) => {
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

module.exports = removeAccessByUser;

