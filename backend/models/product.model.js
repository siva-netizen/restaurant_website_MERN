const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index:true,
      },
      

    availability:{
        type:Boolean,
        required:true,
        index:true,
    },
    price:{
        type:Number,
        required:true,
        index:true,
    },
    imageURLs:{
        type:String,
        required:false,
        index:true,
    }
});

//Creating a model for productSchema 

const Product = mongoose.model('Product',productSchema);
module.exports = Product;