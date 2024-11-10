const express = require('express');
const router = express.Router();
const {viewCategory, viewCategories} = require('../controllers/category.controll');

// Route to view all Category (shared by clients and admins)
router.get('/',viewCategories );

// Route to view a single product by ID (shared by clients and admins)
router.get('/:id', viewCategory);

module.exports = router;
