const { Router } = require('express');
const { addNotification } = require('../controllers/notifications/add-notification.controller');
const { changeNotificationStatus } = require('../controllers/notifications/change-notification-status');
const { fetchUserNotification } = require('../controllers/notifications/fetch-user-notifications');

const notificationRouter = Router();

notificationRouter.post('/add-notification', addNotification);
notificationRouter.get('/fetch-notifications/:user', fetchUserNotification);
notificationRouter.put('/change-notification-status/:user', changeNotificationStatus);

module.exports = notificationRouter;
