const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		firstName: { type: String, required: true},
		lastName: { type: String, required: true},
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		profileImage: { type: String, required: false, default: null },
		role: { type: String, enum: ['CRM_ADMIN', 'CRM_USER'], default: 'CRM_USER' },
		deletedAt: { type: Date, required: false, default: null },
	},
	{ timestamps: true }
);

const UserModel = model('user', userSchema);

module.exports = UserModel;
