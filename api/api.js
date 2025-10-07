const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const productsRouter = require('./routes/products');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/products', productsRouter);

module.exports = apiRouter;