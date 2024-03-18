const MyTeamModel = require('../../../models/my-team.model');

const getMyAgentsController = async (req, res, next) => {
	try {
		const { user } = req.params;

		const myTeams = await MyTeamModel.findOne({ user }).populate({
			path: 'team.user'
		});

		if (myTeams) {
			const supervisorList = myTeams.team.map((item) => {
				//Until implement user roles
				if (item.user.role === 'user') {
					return { _id: item.user._id, fullname: item.user.fullname, email: item.user.email };
				}
			});

			return res.status(200).send({
				code: res.statusCode,
				message: 'Agents found',
				agents: supervisorList
			});
		} else {
			return res.status(404).send({
				code: res.statusCode,
				message: 'Agents not found',
				agents: []
			});
		}
	} catch (error) {
		return res.status(500).send({
			code: 500,
			error: { message: error.message }
		});
	}
};

module.exports = getMyAgentsController;
