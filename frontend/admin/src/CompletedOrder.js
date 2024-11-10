import React, { useState, useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import axios from'axios';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const {
        data: orderData,
        fetchError: fetchErrorOrder,
        isLoading: isLoadingOrder,
    } = useAxiosFetch('http://localhost:5000/api/client/order/');

    useEffect(() => {
        if (orderData && orderData.orders) {
            setOrders(orderData.orders);
        }
    }, [orderData]);
    const handleStatus = async (order) => {
        const newStatus = order.status === 'Pending' ? 'Completed' : 'Pending';
        try {
            const response = await axios.put(`http://localhost:5000/api/client/order/${order._id}`, {
                status: newStatus,
            });

            if (response.status === 200) {
                setOrders(prevOrders =>
                    prevOrders.map(o => o._id === order._id ? { ...o, status: newStatus } : o)
                );
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    return (
        <div className="container mx-auto w-3/4">
            <div className="mt-20">
                <div className="flex flex-wrap justify-center gap-8" >

                    {/* Loading State */}
                    {isLoadingOrder && (
                        <div className="statusMsg flex flex-col justify-center items-center space-y-4 animate-pulse">
                            <img 
                                src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-19.jpg" 
                                alt="Loading icon" 
                                className="w-16 h-16"
                            />
                            <p className="text-lg font-semibold text-gray-700">Loading orders...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {!isLoadingOrder && fetchErrorOrder && (
                        <h1 className="statusMsg text-2xl font-semibold text-red-500">
                            {fetchErrorOrder}
                        </h1>
                    )}

                    {/* Orders Display */}
                    {!isLoadingOrder && !fetchErrorOrder && orders && orders.length > 0 &&  (
                        orders
                        .filter(order => order.status ==='Completed')
                        .map(order => (
                            <div 
                                key={order._id} 
                                className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"

                                onDoubleClick={()=>handleStatus(order)}
                            >
                                <h1 className="font-bold text-xl text-gray-800 mb-2">
                                    Order ID: {order._id}
                                </h1>
                                <h2 className="font-semibold text-lg text-gray-800 mb-2">
                                    Table ID: {order.tableId.table_no}
                                </h2>
                                <p className="text-gray-700 mb-2">Status: <span className={`font-semibold ${order.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{order.status}</span></p>
                                <p className="text-gray-700 mb-2">Total Amount: <span className="font-semibold">₹{order.totalAmount}</span></p>
                                <p className="text-gray-600 mb-2">Order Date: <span className="font-semibold">{new Date(order.orderDate).toLocaleString()}</span></p>

                                {/* Products Display */}
                                <h2 className="font-semibold text-md text-gray-800 mt-4">Products:</h2>
                                <ul className="list-disc list-inside ml-5">
                                    {order.products.map(product => (
                                        <li key={product._id} className="text-gray-600 mb-1">
                                            {product.quantity} x <span className="font-semibold">{product.productId.name}</span> - ₹{product.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}

                    {/* No orders to Display */}
                    {!isLoadingOrder && !fetchErrorOrder && (!orders || orders.length === 0) && (
                        <p className="mt-10 text-lg font-medium text-gray-600 animate-fade-in">
                            No orders to display.
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Orders;
