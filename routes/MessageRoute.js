const express = require('express');
const MessageRouter = express.Router();
const MessageController = require('../controllers/message')

MessageRouter.route('/send').post(MessageController.newMessageHandler);

MessageRouter.route('/send/:id').get(MessageController.findAllSendMessagesByUserID);

MessageRouter.route('/recived/:id').get(MessageController.findAllRecivedMessagesByUserID);

module.exports = MessageRouter;