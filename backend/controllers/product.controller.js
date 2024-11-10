const mongoose = require('mongoose')
const Product = require('../models/product.model')
const cloudinary = require('../config/cloudinaryConfig'); // Import your Cloudinary configuration

const uploadImage = async (req, res) => {
    try {
        const file = req.file; // Assuming you're using middleware like multer to handle file uploads

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path);

        // The URL of the uploaded image
        const imageUrl = result.secure_url;

        res.status(200).json({ url: imageUrl });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: error.message });
    }
};

const newProducts = async (req, res) => {
    try {
        const { name, price, availability, imageURLs, category } = req.body;

        // Validate if the category is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ error: "Invalid category ObjectId" });
        }

        const product = new Product({ 
            name, 
            price, 
            availability, 
            imageURLs, 
            category  // Mongoose will convert this string into an ObjectId
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: error.message });
    }
};


const updateProduct = 
    async (req, res) => {
        try {
          const { id } = req.params;
          const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
          if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json(updatedProduct);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


const deleteProduct = 
    async (req, res) => {
        try {
          const { id } = req.params;
          const product = await Product.findByIdAndDelete(id);
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json({ message: "Product deleted" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


      const viewProducts = async (req, res) => {
        try {
          const products = await Product.find({}).populate('category');
      
          if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products available" });
          }
      
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
      
      const Category = require('../models/category.model'); // Assuming you have a category model

const viewProductsBasedOnCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if the category ID is valid
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Check if the category exists
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Fetch products based on the valid category ID
    const products = await Product.find({ category: categoryId }).populate('category');

    // If no products found, return a message
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewProduct = 
    async (req, res) => {
        try {
          const { id } = req.params;
          const product = await Product.findById(id).populate('category');
          if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

module.exports ={
    newProducts,
    updateProduct,
    deleteProduct,
    viewProducts,
    viewProduct,
    viewProductsBasedOnCategory,
    uploadImage,
}