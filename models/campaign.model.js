const { Schema, model } = require('mongoose');

const CampaignSchema = new Schema(
	{
        user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		name: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: Date, required: true },
        isScheduled: { type: Boolean, required: true },
        isSendText: { type: Boolean, required: true },
        isSendEmail: { type: Boolean, required: true },
        message: { type: String, required: true },
        estimatedCost: { type: Number, required: false },
		deletedAt: { type: Date, required: false, default: null },
	},
	{ timestamps: true }
);

const CampaignModel = model('campaign', CampaignSchema);

module.exports = CampaignModel;
