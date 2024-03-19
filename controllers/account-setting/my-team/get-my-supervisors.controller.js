const MyTeamModel = require('../../../models/my-team.model');
const { getSupervisorsListForMyTeam } = require('../../../services/myteam.service');

const getMySupervisorsController = async (req, res, next) => {
	try {
		const { user } = req.params;

		const data = await getSupervisorsListForMyTeam(user)
		if(data.length){
			return res.status(200).send({
				code: res.statusCode,
				message: 'Supervisors found',
				supervisors: data
			});
		}else{
			return res.status(404).send({
				code: res.statusCode,
				message: 'Supervisors not found',
				supervisors: []
			});
		}


	} catch (error) {
		return res.status(500).send({
			code: 500,
			error: { message: error.message }
		});
	}
};

module.exports = getMySupervisorsController;
