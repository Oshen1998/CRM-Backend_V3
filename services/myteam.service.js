const MyTeamModel = require('../models/my-team.model');

const getSupervisorsListForMyTeam = async (user) => {
	const myTeams = await MyTeamModel.findOne({ user }).populate({
		path: 'team.user'
	});

	if (myTeams) {
		const supervisorList = myTeams.team.map((item) => {
			//Until implement user roles and status

			if (item.user.role === 'user') {
				return { _id: item.user._id, fullname: item.user.fullname, email: item.user.email };
			}
		});
		return supervisorList;
	} else {
		return [];
	}
};

const getAgentsListForMyTeam = async (user) => {
	const myTeams = await MyTeamModel.findOne({ user }).populate({
		path: 'team.user'
	});

	if (myTeams) {
		const agentList = myTeams.team.map((item) => {
			//Until implement user roles and status
			if (item.user.role === 'user') {
				return { _id: item.user._id, fullname: item.user.fullname, email: item.user.email };
			}
		});
		return agentList;
	} else {
		return [];
	}
};

module.exports = { getSupervisorsListForMyTeam, getAgentsListForMyTeam };

