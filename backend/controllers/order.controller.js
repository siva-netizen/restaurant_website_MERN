const Order = require('../models/order.model'); // Import the Order model
const Product = require('../models/product.model'); // Import the Product model

// Add a new order
const addOrder = async (req, res) => {
    try {
        const { tableId, products } = req.body; // Get tableId and products from request body
        const orderProducts = []; // Array to hold order product details
        let totalAmount = 0; // Initialize total amount

        // Iterate over products to fetch name and price
        for (const product of products) {
            const productDetails = await Product.findById(product.productId); // Fetch product details by ID
            if (!productDetails) {
                return res.status(404).json({ message: `Product with ID ${product.productId} not found.` });
            }

            // Create order product object
            orderProducts.push({
                productId: product.productId,
                name: productDetails.name, // Store fetched product name
                quantity: product.quantity,
                price: productDetails.price // Store fetched product price
            });

            // Calculate total amount
            totalAmount += productDetails.price * product.quantity;
        }

        // Create a new order
        const order = new Order({
            tableId,
            products: orderProducts,
            totalAmount,
            status: "pending",
        });

        await order.save(); // Save the order
        res.status(201).json(order); // Respond with the created order
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing order
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) {
            return res.status(404).json('404 Order not found');
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View a specific order by tableId
const viewOrder = async (req, res) => {
    try {
        const { tableId } = req.params; // Get tableId from the request parameters

        // Find orders that match the given tableId
        const orders = await Order.find({ tableId }).populate('products.productId');

        // Check if any orders were found
        if (orders.length === 0) {
            return res.status(404).json('404 Order not found');
        }
        res.status(200).json(orders); // Respond with the found orders
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// View all orders with pagination
const viewOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 orders per page
        const skip = (page - 1) * limit; // Calculate the documents to skip

        // Fetch orders with pagination
        const orders = await Order.find({})
            .populate('products.productId').populate('tableId')
            .skip(skip)
            .limit(limit);

        const totalOrders = await Order.countDocuments({}); // Total order count

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalOrders / limit),
            totalOrders,
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json('404 Order not found');
        }
        res.status(200).json('Order Deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addOrder,
    updateOrder,
    viewOrder,
    viewOrders,
    deleteOrder,
};
