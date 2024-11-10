const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Each category should be unique
    index:true,
  }  
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
