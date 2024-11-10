const express = require('express');
const router = express.Router();
const {viewTable,viewTables} = require('../controllers/table.controllers');

// Route to view all table (shared by clients and admins)
router.get('/', viewTables);

// Route to view a single product by ID (shared by clients and admins)
router.get('/:id', viewTable);

module.exports = router;
