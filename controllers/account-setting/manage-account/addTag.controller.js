'use strict';

const tagModel = require('../../models/tags.model');
const UserModel = require('../../models/user.model'); 
const addTagController = async (req, res, next) => {
	try {
		let { name, colorHex } = req.body;
		const { id } = req.params;

		// Check user role
		const user = await UserModel.findById(id);
		if (!user) {
			return res.status(404).send({
				code: 404,
				message: 'User not found'
			});
		}

		// Restrict tag creation based on user role
		if (user.role !== 'CRM_ADMIN') {
			return res.status(403).send({
				code: 403,
				message: 'Unauthorized: Only CRM_ADMIN can create tags'
			});
		}

		// Check tag existence
		let tagExist = await tagModel.findOne({ name });

		if (tagExist) {
			return res.status(409).send({
				code: res.statusCode,
				message: 'Tag already exists'
			});
		}

		let tag = await tagModel.create({
			name,
			colorHex,
			addedBy: id
		});

		if (tag) {
			return res.status(201).send({
				code: res.statusCode,
				message: 'Tag created successfully',
				tag
			});
		}
	} catch (error) {
		return res.status(500).send({
			code: 500,
			error: { message: 'An internal server error occurred' }
		});
	}
};

module.exports = addTagController;
