const Category = require('../models/category.model')


const newCategory = async (req, res) => {
        try {
          const newCategory = new Category(req.body);
          await newCategory.save();
          res.status(201).json(newCategory);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
}

const updateCategory = 
    async (req, res) => {
        try {
          const { id } = req.params;
          const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
          if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.status(200).json(updatedCategory);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


const deleteCategory = 
    async (req, res) => {
        try {
          const { id } = req.params;
          const Category = await Category.findByIdAndDelete(id);
          if (!Category) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.status(200).json({ message: "Category deleted" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


const viewCategories = 
    async (req, res) => {
        try {
          const Categories = await Category.find({});
          res.status(200).json(Categories);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


const viewCategory = 
    async (req, res) => {
        try {
          const { id } = req.params;
          const category = await Category.findById(id);
          if (!category) {
            return res.status(404).json({ message: "Category not found" });
          }
          res.status(200).json(category);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

module.exports={
    newCategory,
    updateCategory,
    viewCategories,
    viewCategory,
    deleteCategory
}