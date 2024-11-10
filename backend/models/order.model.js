const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    tableId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Table',   
      required: true 
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',  // Reference to Product collection
          required: true,
          index:true,
        },
        name: {
          type: String,  // Fetched from Product collection and stored when added to cart
          required: true,
          index:true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          index:true,
        },
        price: {
          type: Number,  // Fetched and stored when added to cart
          required: true,
          min: 0,
          index:true,
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      index:true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'ready', 'served'],
      default: 'pending'
    },
    orderDate: {
      type: Date,
      default: Date.now,
      index:true,
      
    },
  });
  
module.exports = mongoose.model('Order',orderSchema)