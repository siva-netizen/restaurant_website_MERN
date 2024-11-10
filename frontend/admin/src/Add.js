import React from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();

  // Gradient button style with hover and focus effects
  const gradientButton =
    'w-52 p-4 font-semibold rounded-lg shadow-lg transition-all transform duration-300 ease-in-out ' +
    'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800 text-white ' +
    'hover:scale-105 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-900 ' +
    'focus:ring-4 focus:ring-purple-300 focus:outline-none active:scale-95';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200 p-6">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-800 animate-fade-in">
        Add New Item
      </h1>

      <button className={gradientButton} onClick={() => navigate('/NewProduct')}>
        PRODUCT
      </button>

      <button className={`${gradientButton} mt-4`} onClick={() => navigate('/NewCategory')}>
        CATEGORY
      </button>

      <h1 className="text-3xl font-extrabold mt-12 mb-8 text-gray-800 animate-fade-in">
        Update Item
      </h1>

      <button className={gradientButton} onClick={() => navigate('/UpdateProduct')}>
        PRODUCT
      </button>

      <button className={`${gradientButton} mt-4`} onClick={() => navigate('/UpdateCategory')}>
        CATEGORY
      </button>
    </div>
  );
};

export default Add;
