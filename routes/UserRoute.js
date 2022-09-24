const express = require('express');
const UserRouter = express.Router();
const UserController = require('../controllers/user')

UserRouter.route('/').get(UserController.findAllUsers);

UserRouter.route('/:id').get(UserController.findOne);

UserRouter.route('/create').post(UserController.create);

module.exports = UserRouter;