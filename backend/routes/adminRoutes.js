const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

/**CATEGORY ROUTES FOR ADMIN */
const sharedRoutesCategory = require('../routes/sharedCategory')
router.use('/category',sharedRoutesCategory);
const{ newCategory, updateCategory, deleteCategory } = require('../controllers/category.controll');
router.post('/category',newCategory);
router.put('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);



/**PRODUCT ROUTES FOR ADMIN */
const {newProducts,updateProduct,deleteProduct, uploadImage} = require('../controllers/product.controller');
const sharedRoutes = require('../routes/sharedRoutes')
router.use('/product',sharedRoutes);//shared route for viewing products
router.post('/product',newProducts);// Admin-specific API for creating a product
router.put('/product/:id',updateProduct);// Admin-specific API for updating a product
router.delete('/product/:id',deleteProduct);// Admin-specific API for deleting a product
router.post('/product/:id/uploadImage',uploadImage)



/**TABLE ROUTES FOR ADMIN */
const sharedRoutesTable = require('../routes/sharedRoutesTable')
const {addTable, updateTable, deleteTable} = require('../controllers/table.controllers');
router.post('/tables',addTable); 
router.put('/tables/:id',updateTable); // Admin-specific API for updating a table
router.delete('/tables/:id',deleteTable);
router.use('/tables',sharedRoutesTable);// Admin-specific API for viewing a table


/**ORDER ROUTES */
const sharedOrder = require('../routes/sharedOrder')
router.use('/order',sharedOrder);
module.exports = router;


/**NOTIFICATION ROUTES */
const { updateOrder } = require('../controllers/notification.controller');

// Admin route to update an order status and trigger notification
router.put('/order/:id', updateOrder);

