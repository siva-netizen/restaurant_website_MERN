import React, { useState } from "react";

const NewCategory = () => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name };

    try {
      setIsSubmitting(true); // Start loading
      const response = await fetch('http://localhost:5000/api/admin/category/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Response:', data);
        throw new Error('Error adding category');
      }
      console.log('Category added:', data);

      // Reset form
      setName('');
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200 p-6">
      <div 
        className="
          bg-transparent 
          w-full max-w-md 
          sm:max-w-sm md:max-w-lg lg:max-w-xl
          p-6 sm:p-8 md:p-10 lg:p-12 
          space-y-6 transform hover:scale-105 
          transition duration-300 ease-in-out
        "
      >
        <h1 className="text-3xl font-extrabold text-center text-indigo-600">
          Add Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter category name"
              className="
                w-full px-4 py-2 border border-gray-300 
                rounded-lg focus:outline-none focus:ring-4 
                focus:ring-indigo-300 transition duration-200
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Category'}
          </button>
        </form>

        {/* Success Animation */}
        {name === '' && !isSubmitting && (
          <p className="text-center text-sm text-gray-500 animate-bounce">
            Category added successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default NewCategory;
