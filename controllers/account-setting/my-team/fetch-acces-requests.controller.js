const MyTeamModel = require('../../../models/my-team.model');

const fetchAccessRequests = async (req, res, next) => {
	try {
		MyTeamModel.find({ 'team.user': req.params.user })
			.populate({
				path: 'team.user'
			})
            .populate({
				path: 'user'
			})
			.exec()
			.then((teams) => {
				if (teams.length) {
					const data = teams.map((team) => ({
						documentId: team._id,
						requestId: team.team.find((member) => member.user._id.toString() === req.params.user)._id,
                        email: team.user.email,
                        fullname: team.user.fullname,
                        userIdForAccess: team.user._id,
						status: team.team.find((member) => member.user._id.toString() === req.params.user).status
					}));
					return res.status(200).send({
						code: res.statusCode,
						message: 'Requests found',
						requests: data
					});
				} else {
					return res.status(200).send({
						code: res.statusCode,
						message: 'Requests not found',
						requests: []
					});
				}
			})
			.catch((error) => {
				console.error('Error occurred:', error);
				return res.status(500).send({
					code: res.statusCode,
					message: 'Requests not found',
					error: { message: error.message }
				});
			});
	} catch (error) {}
};

module.exports = fetchAccessRequests;

