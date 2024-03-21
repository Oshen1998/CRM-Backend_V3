const UserModel = require('../models/user.model');

const fetchUserDetailsFunc = async (userId) => {
	try {
		return await UserModel.findById(userId).select("-password")
			.then((response) => {
				return response;
			})
			.catch((error) => {
				throw new Error(error);
			});
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { fetchUserDetailsFunc };

