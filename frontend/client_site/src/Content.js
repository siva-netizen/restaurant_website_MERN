import React from 'react';
import { FaPlus } from "react-icons/fa";

const Content = ({ items, setItems, isLoading, fetchError, navigate }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200"
    >
      <div className="w-full max-w-5xl"> {/* Increased max width for better layout */}
        <div className="mt-20">
          <div className="bg-transparent flex flex-wrap justify-center gap-4 md:gap-8">
            {/* Loading Spinner */}
            {isLoading && (
              <div className="statusMsg flex flex-col justify-center items-center space-y-4 animate-pulse">
                <img
                  src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg"
                  alt="Loading icon"
                  className="w-20 h-20"
                />
                <p className="text-lg font-semibold text-gray-700">Loading Posts...</p>
              </div>
            )}

            {/* Fetch Error Message */}
            {!isLoading && fetchError && (
              <h1 className="statusMsg text-2xl font-semibold text-red-500">{fetchError}</h1>
            )}

            {/* Render Items */}
            {!isLoading && !fetchError && items.length > 0 && (
              items.map(item => (
                <div
                  key={item._id}
                  className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[250px] sm:h-[300px] md:h-[350px] bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
                >
                  <img
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
                    src="/img/indian-bread.jpg"
                    alt={item.name}
                  />
                  <div className="p-4 text-center">
                    <h1 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-2">
                      {item.name}
                    </h1>
                    <button
                      className="mt-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full shadow-md hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-95"
                      onClick={() => navigate(`/view/${item._id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* No Items to Display */}
            {!isLoading && !fetchError && items.length === 0 && (
              <p className="mt-10 text-lg font-medium text-gray-600 animate-fade-in">
                No Posts to Display
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
