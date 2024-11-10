const Notification = require('../models/notification.model');
const Order = require('../models/order.model');

// Example of updating an order and sending a notification
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Status comes from the request (e.g., "preparing", "ready")

  try {
    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create a new notification
    const notification = new Notification({
      orderId: updatedOrder._id,
      message: `Your order is now ${status}.`,
      status: status
    });

    await notification.save();

    // Emit the notification to all clients
    io.emit('orderNotification', {
      orderId: updatedOrder._id,
      message: notification.message,
      status: notification.status,
      timestamp: notification.timestamp
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    updateOrder
}