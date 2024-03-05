const express = require('express');
const http = require('http');
const cors = require('cors'); // Add this line for CORS
const errorHandler = require('./middlewares/global/errorHandlerMiddleware');
const notFoundErrorHandler = require('./middlewares/global/notFoundErrorHandler.middleware');
const router = require('./routes/router');
const { env } = require('process');

require('./config/dotenv.config');
require('./config/mongoose.config');

const app = express();
const server = http.createServer(app); // Remove the empty object from createServer
const PORT = env.PORT;

app.use(express.json(), express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

app.use(router);

app.use(notFoundErrorHandler);
app.use(errorHandler);

server.listen(PORT, () =>
	console.log(
		`server is running on port : ${PORT},\n http://localhost:${PORT}`,
	),
);
