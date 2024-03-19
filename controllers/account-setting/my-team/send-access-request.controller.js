'use strict';
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
			const existingEmails = myTeam.team.map((member) => member.user.email);
			let filteredEmailList = [];
			if (existingEmails.length > 0) {
				filteredEmailList = emailList.filter((email) => !existingEmails.includes(email));
			} else {
				filteredEmailList = emailList;
			}
			console.log('filteredEmailList', filteredEmailList);
			const teams = await UserModel.find({ email: { $in: filteredEmailList } });

			const refactorTeamObj = teams.map((user) => ({
				user: user,
				status: 'PENDING'
			}));

			if (refactorTeamObj.length) {
				MyTeam.findOneAndUpdate(
					{ user },
					{ $push: { team: { $each: refactorTeamObj } } },
					{ new: true }
				)
					.then((response) => {
						res.status(200).send(response);
					})
					.catch((error) => {
						res.status(400).send({ error: error.message });
					});
			} else {
				res.status(404).send({ message: 'No accounts adding found for email list' });
			}
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
		res
			.status(500)
			.send({ code: 500, message: 'Something went wrong', error: { message: error.message } });
	}
};

module.exports = {
	sendAccessRequest
};
