const express = require('express');
const userRouter = express.Router();
const db = require('../../db/queries');
const cartRouter = require('./cart');
const ordersRouter = require('./orders');
const authenticate = require('../../util/authenticate');
const {authenticateToken} = require('../../util/jwt');
require('dotenv').config();

usersRouter.post('/register', db.registerUser, db.loginUser);

usersRouter.param('userId', db.setUserId);
usersRouter.get('/:userId', db.getUserById);
usersRouter.put('/:userId', authenticate, db.updateUser);
usersRouter.put('/:userId/password', authenticate, db.changePassword);
usersRouter.use('/:userId/cart', cartRouter);
usersRouter.use('/:userId/orders', ordersRouter);

module.exports = userRouter;