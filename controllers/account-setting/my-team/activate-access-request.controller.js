'use strict';
const MyTeamModel = require("../../../models/my-team.model");

const activateAccessRequest = async (req, res, next) => {
	try {
        MyTeamModel.findOneAndUpdate(
            { 'team._id': memberId }, // Query to find the correct document and the correct object within the team array
            { $set: { 'team.$.status': "ACCEPTED" } }, // Update to set the new status value
            { new: true } // Option to return the updated document
          )
            .exec()
            .then(updatedTeam => {
              if (updatedTeam) {
                console.log('Updated team:', updatedTeam);
              } else {
                console.log('Team or member not found');
              }
            })
            .catch(error => {
              console.error('Error occurred:', error);
            });
    }catch (error) {
        console.error('Error occurred:', error);
		return res.status(500).send({
			code: res.statusCode,
			message: 'Something went wrong',
			error: { message: error.message }
		});
    }

};

module.exports = activateAccessRequest;
