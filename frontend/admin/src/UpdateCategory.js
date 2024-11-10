import React, { useEffect, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';

const UpdateCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/category');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch specific category details when categoryId changes
  const { data: categoryData, fetchError, isLoading } = useAxiosFetch(
    categoryId && categoryId !== '' ? `http://localhost:5000/api/admin/category/${categoryId}` : null
  );

  // Update form fields with selected category data
  useEffect(() => {
    if (categoryData) {
      setSelectedCategory(categoryData);
      setName(categoryData.name || ''); // Populate the name field
    }
  }, [categoryData]);

  const handleCategorySelected = (e) => {
    const id = e.target.value;
    setCategoryId(id); // Trigger fetching of category data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId || !name) {
      alert('Please select a category and enter a name.');
      return; // Ensure valid input
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/category/${categoryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Failed to update category');
      alert('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className='flex item-center justify-center min-h-screen bg-gray-100'>
      <div className="items-center justify-center bg-transparent w-full max-w-md p-6 space-y-6 transition duration-300 ease-in-out text-center">
        <h1 className="text-3xl font-extrabold text-center text-black-600">Update Category</h1>

        {/* Category Dropdown */}
        <div className="mb-4 w-full max-w-lg">
          <label className="block text-lg font-medium mb-2">Select Category</label>
          <select
            value={categoryId || ''}
            onChange={handleCategorySelected}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Conditionally render the form only if a category is selected */}
        {categoryId && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium mb-2">Category Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </form>
        )}

        {fetchError && categoryId && <p className="text-red-500 mt-2">{fetchError}</p>}
      </div>
    </div>
  );
};

export default UpdateCategory;
