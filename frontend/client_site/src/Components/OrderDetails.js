import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const { tableId } = useParams();
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/client/order/${tableId}`);
                if (!response.ok) throw new Error('Failed to fetch order');
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };
        fetchOrderData();
    }, [tableId]);

    return (
        <div className="p-6">
            {orderData ? (
                <div>
                    <h2 className="text-2xl font-bold">Order Details for Table {tableId}</h2>
                    <ul>
                        {orderData.products.map(product => (
                            <li key={product.productId} className="flex justify-between py-2">
                                <span>{product.name} (₹{product.price})</span>
                                <span>Qty: {product.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="mt-4 text-xl font-semibold">Total: ₹{orderData.totalAmount}</h3>
                    <h4>Status: {orderData.status}</h4>
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
};

export default OrderDetails;
