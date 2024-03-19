'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('../../models/user.model');
const { verifyPassword, genToken } = require('../../utils/auth.utils');

const loginController = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await userModel.findOne({ email });

		if (!user || !verifyPassword(password, user.password)) {
			return res.status(404).send({
				message: 'Email or password is invalid'
			});
		}

		const token = genToken({ email: user.email, password: user.password });

		return res.status(201).json({
			code: res.statusCode,
			message: 'Successfully logged in 😁',
			token: token,
			userId: user._id
		});
	} catch (error) {
		console.error('Error during login:', error);
		return res.status(500).send({
			code: 500,
			error: { message: 'An internal server error occurred' }
		});
	}
};

module.exports = loginController;
