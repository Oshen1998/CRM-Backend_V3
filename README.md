when renderting data to the frontend use this pagination method type

const Event = require('./models/Event'); // Import your Event model
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

// Apply pagination plugin to your Event schema
Event.plugin(paginate);

const getEvent = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const options = {
            page: page,
            limit: limit,
        };

        const events = await Event.paginate({}, options);

        res.json(events);
    } catch (error) {
        res.status(500).send("Server Error: " + error);
    }
}

module.exports = getEvent;
