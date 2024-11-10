import React, { useEffect, useState } from 'react';

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [availability, setAvailability] = useState(true);
  const [imageURLs, setImageURLs] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/category');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      availability,
      imageURLs,
      category: categoryId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/admin/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Response:', data);
        throw new Error('Error adding product');
      }
      console.log('Product added:', data);

      // Reset form
      setName('');
      setPrice('');
      setAvailability(true);
      setImageURLs('');
      setCategoryId('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200 p-6">
      <div className=" bg-transparent 
          w-full max-w-md 
          sm:max-w-sm md:max-w-lg lg:max-w-xl
          p-6 sm:p-8 md:p-10 lg:p-12 
          space-y-6 transform hover:scale-105 
          transition duration-300 ease-in-out">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter product price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            />
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center">
            <label className="mr-2 text-lg font-medium text-gray-700">Availability:</label>
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              value={imageURLs}
              onChange={(e) => setImageURLs(e.target.value)}
              required
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;
