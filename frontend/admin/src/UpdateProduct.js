import React, { useEffect, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';
const UpdateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [availability, setAvailability] = useState(true); // Default to true
  const [imageURLs, setImageURLs] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Store all products of the selected category
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the product to be updated

  // Fetch categories when the component mounts
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

  // Fetch products when a category is selected
  const { 
    data: productData, 
    fetchError: fetchErrorProduct, 
    isLoading: isLoadingProduct 
  } = useAxiosFetch(`http://localhost:5000/api/admin/product/category/${categoryId}`);

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);

  // Populate form fields when a product is selected
  const handleProductSelect = (product) => {
    if(!product) {
      setSelectedProduct(null);
    setName('');
    setPrice('');
    setAvailability(false);
    setImageURLs('');
      return};
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price);
    setAvailability(product.availability);
    setImageURLs(product.imageURLs);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/product/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) throw new Error('Failed to delete product');
  
      // Filter out the deleted product from the products list
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts); // Update state with the remaining products
      alert('Product deleted successfully!');
  
      // Clear the form fields if necessary
      setName('');
      setPrice('');
      setAvailability(true);
      setImageURLs('');
      setCategoryId('');
      setSelectedProduct(null);
      
      // Navigate after successfully deleting the product
      navigate('/UpdateProduct');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product.'); // Provide feedback
    }
  }
  
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
      const response = await fetch(`http://localhost:5000/api/admin/product/${selectedProduct._id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Response:', data);
        throw new Error('Error updating product');
      }
      console.log('Product updated:', data);

      // Reset form
      setName('');
      setPrice('');
      setAvailability(true);
      setImageURLs('');
      setCategoryId('');
      setSelectedProduct(null);
      setProducts([]); // Reset the products list
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className='flex item-center justify-center min-h-screen bg-gray-100'>
        <div className=" bg-transparent 
          w-full max-w-md 
          sm:max-w-sm md:max-w-lg lg:max-w-xl
          p-6 sm:p-8 md:p-10 lg:p-12 
          space-y-6 transform hover:scale-105 
          transition duration-300 ease-in-out">
      <h1 className="text-3xl font-extrabold text-center text-black-600">
         Update Product</h1>

      {/* Category Dropdown */}
      <div className="mb-4 w-full max-w-lg">
        <label className="block text-lg font-medium mb-2"></label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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

      {/* Product Dropdown */}
      {products.length > 0 && (
        <div className="mb-4 w-full max-w-lg">
          <label className="block text-lg font-medium mb-2">Product</label>
          <select
            onChange={(e) =>
              handleProductSelect(products.find((p) => p._id === e.target.value))
            }
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
              categoryId=='' ? 'cursor-not-allowed pointer-events-none bg-gray-100' : ''
            }`}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Product Update Form */}
      {selectedProduct && (
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex items-center mb-2">
            <label className="mr-2">Availability</label>
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
          </div>

          <div className="block text-lg font-medium mb-2">
            <label className="block text-lg font-medium mb-2">Category</label>
            <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
            <option value="">Select Category</option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>
                {category.name}
                </option>
            ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={imageURLs}
              onChange={(e) => setImageURLs(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update Product
          </button>
          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            onClick={()=>{handleDelete(selectedProduct._id)}}
          >
            Delete Product
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default UpdateProduct;
