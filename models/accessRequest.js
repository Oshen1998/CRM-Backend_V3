const { Schema, model } = require('mongoose');

const accessRequestSchema = new Schema(
	{
        supervisor: { type: Schema.Types.ObjectId, ref: 'user' },
		agent: { type: Schema.Types.ObjectId, ref: 'user' },
        status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
	},
	{ timestamps: true },
);

const accessRequestModel = model('tag', accessRequestSchema);

module.exports = accessRequestModel;
