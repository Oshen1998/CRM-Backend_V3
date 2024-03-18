const { getAgentsListForMyTeam } = require('../../../services/myteam.service');

const getMyAgentsController = async (req, res, next) => {
	try {
		const { user } = req.params;

		const data = await getAgentsListForMyTeam(user);
		if (data.length) {
			return res.status(200).send({
				code: res.statusCode,
				message: 'Agents found',
				agents: data
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
