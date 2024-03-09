**when renderting data to the frontend use this pagination method type
In this example, the mongoose-paginate-v2 library is used to handle pagination. The page and limit parameters are extracted from the query string. If not provided, default values are used (page 1 and limit 10). The Event.paginate method is then used to fetch the paginated events.
**
Now, you can call your endpoint like this to get different pages:

To get the first page: /getEvent?page=1
To get the second page: /getEvent?page=2
To change the number of items per page (e.g., 20 items per page): /getEvent?page=1&limit=20

///////////////////////////////////////////code starts from here////////////////////////////////////////////////////////


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
