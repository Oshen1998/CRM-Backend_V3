const { Router } = require('express');
const { addNotification } = require('../controllers/notifications/add-notification.controller');
const { fetchUserNotification } = require('../controllers/notifications/fetch-user-notifications');

const notificationRouter = Router();

notificationRouter.post('/add-notification', addNotification);
notificationRouter.get('/fetch-notifications/:user', fetchUserNotification);

module.exports = notificationRouter;
