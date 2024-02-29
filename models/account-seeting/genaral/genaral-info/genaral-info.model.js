const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	accessCode: {
		type: String,
		trim: true,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	forwardCallsTo: {
		type: String,
		required: true,
	},
	stopTextingTime: {
		type: String,
		required: true,
		enum: ['10PM', 'Custom'],
	},
	customStopTextingTime: {
		monday: String,
		tuesday: String,
		wednesday: String,
		thursday: String,
		friday: String,
		saturday: String,
		sunday: String,
	},
	defaultTimeZone: {
		type: String,
		required: true,
	},
	systemAlerts: {
		newLead: {
			type: Boolean,
			default: true,
		},
		newText: {
			type: Boolean,
			default: true,
		},
		missedCall: {
			type: Boolean,
			default: true,
		},
		leadEmail: {
			type: Boolean,
			default: true,
		},
		callRecording: {
			type: Boolean,
			default: true,
		},
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
