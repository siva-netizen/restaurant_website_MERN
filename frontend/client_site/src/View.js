import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFetch from './hooks/useAxiosFetch';
import { FaPlateWheat, FaBowlFood } from "react-icons/fa6";
import { PiCookingPot } from "react-icons/pi";
const View = ({ setCartItems, cartItems }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({}); // Track added items

  const addToCart = (product) => {
    const isInCart = cartItems.some(cartItem => cartItem._id === product._id);
    
    if (isInCart) {
      alert('Item already selected');
    } else {
      setCartItems((prevItems) => [...prevItems, product]);
      // Update the state to indicate that the product has been added
      setAddedItems((prev) => ({ ...prev, [product._id]: true }));
    }
  };

  // Fetch products based on category ID
  const { data: productData, fetchError: fetchErrorProduct, isLoading: isLoadingProduct } = 
  useAxiosFetch(categoryId ? `http://localhost:5000/api/client/products/category/${categoryId}` : null);

  // Set products when data is fetched
  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-purple-100 to-indigo-200">
      <div className="w-full max-w-5xl">
        <div className="mt-20">
          <div className="flex flex-wrap justify-center gap-8">

            {/* Loading State */}
            {isLoadingProduct && (
              <div className="statusMsg flex flex-col justify-center items-center space-y-4 animate-pulse">
                <img 
                  src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg" 
                  alt="Loading icon" 
                  className="w-20 h-20"
                />
                <p className="text-lg font-semibold text-gray-700">Loading Products...</p>
              </div>
            )}

            {/* Error State */}
            {!isLoadingProduct && fetchErrorProduct && (
              <h1 className="statusMsg text-2xl font-semibold text-red-500">
                {fetchErrorProduct}
              </h1>
            )}

            {/* Products Display */}
            {!isLoadingProduct && !fetchErrorProduct && products.length > 0 && (
              products.map(product => (
                <div 
                  key={product._id} 
                  className="w-[160px] h-[250px] sm:w-[200px] sm:h-[300px] md:w-[250px] md:h-[350px] bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden"
                >
                  <img
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
                    src={product.imageURLs}
                    alt={product.name}
                  />
                  <div className="p-4 text-center">
                    <h1 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 mb-1">
                      {product.name} 
                    </h1>
                    <p className="font-bold text-base sm:text-lg md:text-xl text-green-800 mb-2">₹{product.price}</p>
                    <div className="flex justify-center w-full">
                      {addedItems[product._id] ? (

                       <PiCookingPot className='text-green-600 text-2xl'onClick={() => addToCart(product)} />
                      ) : (
                        <FaBowlFood 
                          className='text-gray-700 hover:text-red-500 text-2xl cursor-pointer transition-colors' 
                          onClick={() => addToCart(product)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* No Products to Display */}
            {!isLoadingProduct && !fetchErrorProduct && products.length === 0 && (
              <p className="mt-10 text-lg font-medium text-gray-600 animate-fade-in">
                No Products to Display
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
