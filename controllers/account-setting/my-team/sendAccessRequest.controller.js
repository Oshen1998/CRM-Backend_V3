const UserModel = require('../../../models/user.model');
const MyTeam = require('../../../models/my-team.model');

const sendAccessRequest = async (req, res, next) => {
	try {
		const { user, emailList } = req.body;

		const myTeam = await MyTeam.findOne({ user }).populate({
			path: 'team.user',
			select: 'email'
		});

		if (myTeam) {
			const teams = await UserModel.find({ email: { $in: emailList } });

			//Remain send notification to agent newly added
			// const filterMails =  emailList.filter(item => !myTeam.team.includes(item))
			// console.log(filterMails)

			const refactorTeamObj = teams.map((user) => ({
				user: user,
				status: 'pending'
			}));

			MyTeam.findOneAndUpdate({ user }, { team: refactorTeamObj })
				.then((response) => {
					res.status(200).send(response);
				})
				.catch((error) => {
					res.status(400).send({ error: error.message });
				});
		} else {
			await MyTeam.create({
				user,
				team: refactorTeamObj
			})
				.then((response) => {
					res.status(200).send(response);
				})
				.catch((error) => {
					res.status(400).send({ error: error.message });
				});

			//Remain send notification to agent newly added
		}
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = {
	sendAccessRequest
};
