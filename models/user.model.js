const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		profileImage: { type: String, required: false, default: null },
		role: { type: String, enum: ['CRM_ADMIN', 'CRM_USER'], default: 'CRM_USER' },
		timezone: { type: String, required: false },
		phoneNumber: { type: String, required: false },
		alerts: {
			newLeadComesIn: { type: Boolean, required: true, default: false },
			newTextMessage: { type: Boolean, required: true, default: false },
			missCall: { type: Boolean, required: true, default: false },
			leadOpensEmail: { type: Boolean, required: true, default: false },
			callRecording: { type: Boolean, required: true, default: false }
		},
		stopTextingLeadsTime: {
			type: {
				type: String,
				enum: ['DEFAULT_TIME', 'CUSTOM_TIME'],
				required: false,
				default: 'DEFAULT_TIME'
			},
			timeSlots: {
				monday: { type: String, required: false },
				tuesday: { type: String, required: false },
				wednesday: { type: String, required: false },
				thursday: { type: String, required: false },
				friday: { type: String, required: false },
				saturday: { type: String, required: false },
				sunday: { type: String, required: false }
			}
		},
		deletedAt: { type: Date, required: false, default: null }
	},
	{ timestamps: true }
);

const UserModel = model('user', userSchema);

module.exports = UserModel;
