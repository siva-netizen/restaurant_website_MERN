// routes/sharedRoutes.js
const express = require('express');
const router = express.Router();
const { viewProducts, viewProduct, viewProductsBasedOnCategory } = require('../controllers/product.controller');

// Route to view all products (shared by clients and admins)
router.get('/', viewProducts);

// Route to view a single product by ID (shared by clients and admins)
router.get('/product/:id', viewProduct); // Use /product/:id to distinguish

// Route to view products based on category (shared by clients and admins)
router.get('/category/:categoryId', viewProductsBasedOnCategory); // Use /category/:categoryId to distinguish

module.exports = router;
