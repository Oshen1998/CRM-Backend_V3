'use strict';

const userModel = require('../../models/user.model');
const { hashPassword } = require('../../utils/auth.utils');

const registerController = async (req, res, next) => {
	try {
		let { firstName, lastName, email, password, mobile, timeZone } = req.body;

		let fullname = `${firstName} ${lastName}`;

		//check email existence
		let userExist = await userModel.findOne({ email });

		if (userExist) {
			return res.status(409).send({
				code: res.statusCode,
				message: 'email already exists'
			});
		}

		let user = await userModel.create({
			fullname,
			email,
			password: hashPassword(password),
			mobile,
			timeZone
		});

		if (user)
			return res.status(201).send({
				code: res.statusCode,
				message: 'user created successfully',
				user
			});
	} catch (error) {
		return res.status(500).send({
			code: 500,
			error: { message: 'An internal server error occurred' }
		});
	}
};

module.exports = registerController;
