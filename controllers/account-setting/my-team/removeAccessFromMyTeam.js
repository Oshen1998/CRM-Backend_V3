const MyTeamModel = require('../../../models/my-team.model');
const { getSupervisorsListForMyTeam, getAgentsListForMyTeam } = require('../../../services/myteam.service');

const removeAccessFromMyTeam = async (req, res, next) => {
	try {
		const { user } = req.params;
		const { disconnectUserId } = req.body;

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
			res.status(404).send({
				code: res.statusCode,
				message: 'No Team Found'
			});
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send({
			code: res.statusCode,
			message: error.message
		});
	}
};

module.exports = removeAccessFromMyTeam;

