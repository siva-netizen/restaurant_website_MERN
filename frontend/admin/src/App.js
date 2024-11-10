import Header from './Header';
import Content from './Content';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import View from './View';
import { useParams } from 'react-router-dom';
import NewProduct from './NewProduct';
import Add from './Add';
import NewCategory from './NewCategory'
import UpdateProduct from './UpdateProduct';
import UpdateCategory from './UpdateCategory';
import Orders from './Orders';
import CompletedOrder from './CompletedOrder'

function App() {
  const [items, setItems] = useState([]);

  const { data: categoryData, fetchError: fetchErrorCategory, isLoading: isLoadingCategory } = useAxiosFetch('http://localhost:5000/api/admin/category/');

  const { categoryId } = useParams();
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
  }, [categoryData]);

  const navigate = useNavigate();

  return (
    <div className="App">
      <Header title="SSV MESS" Headermessage="You are in Admin Page"
      navigate={navigate} />
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
            />
          } 
        />
        <Route 
          path='/Add'
          element={<Add />}
        />
        <Route 
          path='/NewProduct'
          element={<NewProduct />}
        />
        <Route 
          path='/NewCategory'
          element={<NewCategory />}
        />
        <Route 
          path='/UpdateProduct'
          element={<UpdateProduct />}
        />
         <Route 
          path='/UpdateCategory'
          element={<UpdateCategory />}
        />
        <Route 
        path='/Orders'
        element={<Orders />}
        />
        <Route 
        path='/completed-orders'
        element={<CompletedOrder />}
        />
      </Routes>
      
    </div>
  );
}

export default App;
