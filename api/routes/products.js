const express = require('express');
const productsRouter = express.Router();
const db = require('../../db/queries');

productsRouter.get('/', db.getProducts);
productsRouter.get('/:productId', db.getProductById);

module.exports = productsRouter;