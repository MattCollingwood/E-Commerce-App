const express = require('express');
const ordersRouter = express.Router({mergeParams: true});
const db = require('../../db/queries');
const authenticate = require('../../util/authenticate');
require('dotenv').config();

ordersRouter.use(authenticate);
ordersRouter.get('/', db.getOrders);
ordersRouter.param('orderId', db.setOrderById);
ordersRouter.get('/:orderId', db.getOrderById);
ordersRouter.delete('/:orderId', db.deleteOrder);

module.exports = ordersRouter;