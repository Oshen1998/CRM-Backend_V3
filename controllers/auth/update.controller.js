'use strict';

const UserModel = require('../../models/user.model');

const updateController = async (req, res, next) => {
	const updateData = req.body;
	try {
		const user = req.user;
		const userResponse = await UserModel.findById(user.id);
		if (!userResponse) {
			throw new Error('User not found');
		}

		// Update only the fields that are received from the request body
		Object.keys(updateData).forEach((key) => {
			if (updateData[key]) {
				userResponse[key] = updateData[key];
			}
		});

		// Validate the updated user document
		const validationResult = userResponse.validateSync(); // Synchronous validation
		if (validationResult) {
			throw new Error(validationResult.errors);
		}

		// Save the updated user document
		const updatedUser = await userResponse.save();
		return res.status(200).send({
			code: res.statusCode,
			message: 'Updated User successfully',
			user: updatedUser
		});
	} catch (error) {
		console.error(error.message);
		res
			.status(500)
			.send({ code: 500, message: 'Something went wrong', error: { message: error.message } });
	}
};

module.exports = updateController;
