const mongoose = require('mongoose');
const notificstionSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.ObjectId,
        ref:'Order',
        default:null,
        required:true,
        index:true,
    },
    message:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['pending', 'accepted', 'preparing', 'ready', 'served'],
        required:true,
        index:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
        index:true,
    }
})

const Notification = mongoose.model('Notification',notificstionSchema);
module.exports = Notification;