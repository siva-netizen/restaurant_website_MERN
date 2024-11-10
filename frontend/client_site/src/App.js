import Header from './Header';
import Content from './Content';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import View from './View';
import { useParams } from 'react-router-dom';
import SidePlate from './Components/SidePlate';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);
    const { categoryId } = useParams();
    const { data: categoryData, fetchError: fetchErrorCategory, isLoading: isLoadingCategory } = useAxiosFetch('http://localhost:5000/api/client/category/');

    
    const [products, setProducts] = useState([]);
    const productDataUrl = categoryId ? `http://localhost:5000/api/client/products/category/${categoryId}` : null;
    const { data: productData, fetchError: fetchErrorProduct, isLoading: isLoadingProduct } = useAxiosFetch(productDataUrl);

    useEffect(() => {
        if (productData) {
            setProducts(productData);
        }
    }, [productData]);

    useEffect(() => {
        if (categoryData) {
            setItems(categoryData);
        }
        if (productData) setCartItems([]);
    }, [categoryData, productData]);

    const navigate = useNavigate();

    const toggleCart = () => {
        setCartOpen((prev) => !prev);
    };

    const addOrder = (order) => {
      console.log("Order placed:", order);
      // Implement your API call logic here if you need to send the order to the backend.
      fetch('http://localhost:5000/api/client/order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Success:', data);
          setCartItems([]); // Clear the cart if needed
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  };
  

    return (
        <div className="App">
            <Header title="SSV MESS" Headermessage="Order Now" toggleCart={toggleCart} />
            <Routes>
                <Route 
                    path='/' 
                    element={<Content 
                        items={items}
                        setItems={setItems}
                        isLoading={isLoadingCategory} 
                        fetchError={fetchErrorCategory}
                        navigate={navigate} 
                    />} 
                />
                <Route 
                    path='/view/:categoryId' 
                    element={
                        <View 
                            isLoadingProduct={isLoadingProduct} 
                            fetchErrorProduct={fetchErrorProduct} 
                            products={products} 
                            navigate={navigate}
                            setCartItems={setCartItems} 
                            cartItems={cartItems}
                        />
                    } 
                />
            </Routes>
            {/* Sidebar Cart Component */}
            <SidePlate 
                isOpen={isCartOpen} 
                toggleCart={toggleCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
                addOrder={addOrder} // Pass addOrder function
            />
        </div>
    );
}

export default App;
