const express = require('express');
const router = express.Router();
const sharedRoutes = require('../routes/sharedRoutes')
const sharedRoutesCategory = require('../routes/sharedCategory')
const sharedOrder = require('../routes/sharedOrder')
router.use('/category',sharedRoutesCategory);
//shared route for viewing products
router.use('/products',sharedRoutes)

const sharedRoutesTable = require('../routes/sharedRoutesTable')
router.use('/tables',sharedRoutesTable)

const{ addOrder, viewOrders, viewOrder, updateOrder, deleteOrder } = require('../controllers/order.controller');
router.use('/order',sharedOrder);
router.post('/order', addOrder); // Create a new order
router.put('/order/:id', updateOrder); // Update an order
router.delete('/order/:id',deleteOrder); // Delete an order


module.exports = router