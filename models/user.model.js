const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		fullname: { type: String, minLength: 5, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, minLength: 8, required: true },
		role: { type: String, default: 'user' },
		status: { type: String, default: 'active' },
		username: { type: String },
		profilePicture: { type: String },
		coverPicture: { type: String },
		mobile: { type: String },
		bio: { type: String },
		timeZone: { type: String }
	},
	{ timestamps: true }
);

const userModel = model('user', userSchema);

module.exports = userModel;
