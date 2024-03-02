'use strict';

const userModel = require('../../models/user.model');

const updateController = async (req, res, next) => {
	try {
		const { fullname, email, username, bio, mobile } = req.body;
        const { id } = req.params;

		// Check if the user exists
        const existingUser = await userModel.findById(id)
		if (!existingUser) {
			return res.status(404).json({
				code: 404,
				error: { message: 'User not found' },
			});
		}

        //check email existence
        if (email) {
            const userExist = await userModel.findOne({
                email,
                _id: { $ne: id },
            });
            if (userExist) {
                return res.status(409).json({
                    code: 409,
                    error: { message: 'Email already exists' },
                });
            }
        }

        //check username existence
        if (username) {
            const userExist = await userModel.findOne({
                username,
                _id: { $ne: id },
            });
            if (userExist) {
                return res.status(409).json({
                    code: 409,
                    error: { message: 'Username already exists' },
                });
            }
        }


		// Update the user data if it is available in the request body
		if (fullname) existingUser.fullname = fullname;
		if (username) existingUser.username = username;
		if (bio) existingUser.bio = bio;
		if (mobile) existingUser.mobile = mobile;
        if (email) existingUser.email = email;

		await existingUser.save();

		// Return the updated user object
		return res.status(200).json({
			code: 200,
			message: 'User updated successfully',
			user: existingUser,
		});
	} catch (error) {
		console.error('Failed to update user:', error);
		return res.status(500).json({
			code: 500,
			error: { message: 'An internal server error occurred' },
		});
	}
};

module.exports = updateController;
