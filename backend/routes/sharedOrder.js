const express = require('express');
const router = express.Router();
const {viewOrder,viewOrders} = require('../controllers/order.controller');

router.get('/', viewOrders);
router.get('/:tableId', viewOrder); // View a specific order

module.exports = router;