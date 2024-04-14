'use strict';
const { getSupervisorsListForMyTeam } = require('../../../services/myteam.service');

const getMySupervisorsController = async (req, res, next) => {
	try {
		const user = req.user;

		if (user.role !== 'CRM_ADMIN' && user.role !== 'CRM_SUPERVISOR') {
			return res.status(403).send({
				code: 403,
				message: 'Unauthorized: Only users with role CRM_ADMIN or CRM_SUPERVISOR can access this endpoint'
			});
		}

		const data = await getSupervisorsListForMyTeam(user.id);
		return res.status(200).send({
			code: res.statusCode,
			message: data.length ? 'Supervisors found' : 'No Supervisors found',
			supervisors: data
		});
	} catch (error) {
		return res.status(500).send({
			code: 500,
			message: 'Something went wrong',
			error: { message: error.message }
		});
	}
};

module.exports = getMySupervisorsController;
