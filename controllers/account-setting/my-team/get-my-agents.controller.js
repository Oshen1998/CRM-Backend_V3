'use strict';
const { getAgentsListForMyTeam } = require('../../../services/myteam.service');

const getMyAgentsController = async (req, res, next) => {
	try {
		const user = req.user;

		if (user.role !== 'CRM_ADMIN') {
			return res.status(403).send({
				code: 403,
				message: 'Unauthorized: Only users with role CRM_ADMIN can access this endpoint'
			});
		}

		const data = await getAgentsListForMyTeam(user.id);

		return res.status(200).send({
			code: res.statusCode,
			message: data.length ? 'Agents found' : 'No Agents found',
			agents: data
		});
	} catch (error) {
		return res.status(500).send({
			code: 500,
			message: 'Something went wrong',
			error: { message: error.message }
		});
	}
};

module.exports = getMyAgentsController;
