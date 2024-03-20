const { Schema, model } = require('mongoose');

const NotificationsSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		content: {
			type: String,
			required: true
		},
		read: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
);

const NotificationModel = model('Notification', NotificationsSchema);

module.exports = NotificationModel;

