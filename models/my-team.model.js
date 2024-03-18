const { Schema, model } = require('mongoose');

const MyTeamSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		team: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'user',
					required: true
				},
				status: {
					type: String,
					enum: ['pending', 'accepted', 'declined'],
					default: 'pending',
					required: true
				}
			}
		]
	},
	{ timestamps: true }
);

const MyTeamModel = model('MyTeam', MyTeamSchema);

module.exports = MyTeamModel;
