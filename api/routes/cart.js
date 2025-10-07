const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Optional: param middleware for cartId
router.param('cartId', (req, res, next, cartId) => {
  req.cartId = cartId; // attach cartId to req
  next();
});

// Create a new cart
router.post('/', cartController.createCart);

// Get a cart by ID
router.get('/:cartId', cartController.getCartById);

// Update cart items by ID
router.put('/:cartId', cartController.updateCart);

// Checkout cart (create order)
router.post('/:cartId/checkout', cartController.checkoutCart);

module.exports = router;