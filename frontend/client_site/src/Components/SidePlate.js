import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import jsPDF from 'jspdf'; // Import jsPDF
// import logo from './images/logo.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const SidePlate = ({ isOpen, toggleCart, cartItems, setCartItems }) => {
    const [quantities, setQuantities] = useState({});
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [pdfLink, setPdfLink] = useState(''); 
    const [isSuccessful, setIsSuccessful] = useState(false);
    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/client/tables');
                const data = await response.json();
                setTables(data);
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };
        fetchTables();
    }, []);

    const deleteProduct = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
    };

    const handleQuantityChange = (item, action) => {
        setQuantities(prevQuantities => {
            const currentQuantity = prevQuantities[item._id] || 1;
            if (action === 'increase') {
                return { ...prevQuantities, [item._id]: currentQuantity + 1 };
            } else if (action === 'decrease' && currentQuantity > 1) {
                return { ...prevQuantities, [item._id]: currentQuantity - 1 };
            }
            return prevQuantities;
        });
    };

    const handleDecrease = (item) => {
        const currentQuantity = quantities[item._id] || 1;
        if (currentQuantity <= 1) {
            deleteProduct(item._id);
        } else {
            handleQuantityChange(item, 'decrease');
        }
    };

    const addOrder = async (order) => {
        try {
            const response = await fetch('http://localhost:5000/api/client/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Order placement failed:", errorData);
                throw new Error("Failed to place order");
            }
            
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const handlePlaceOrder = () => {
        if (!selectedTable) {
            alert("Please select a table.");
            return;
        }

        const order = {
            tableId: selectedTable,
            products: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                quantity: quantities[item._id] || 1,
                price: item.price,
            })),
            totalAmount: cartItems.reduce(
                (total, item) => total + item.price * (quantities[item._id] || 1),
                0
            ),
            status: "pending",
        };

        addOrder(order);
        const audio = new Audio(`${process.env.PUBLIC_URL}/img/success-1-6297.mp3`); 
        audio.play();
        setIsSuccessful(true);
    };

    const handleViewBill = async (tableId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/client/order/${tableId}`);
            if (!response.ok) throw new Error("Failed to fetch order");
            const fetchedOrderData = await response.json();
            console.log("Fetched order data:", fetchedOrderData);
            
            // Check if any orders were fetched
            if (fetchedOrderData.length > 0) {
                // Set the latest order as the current order to view
                setOrderData(fetchedOrderData[fetchedOrderData.length - 1]); // Select the latest order
            } else {
                console.error("No orders found");
            }
            
            setIsModalOpen(true); // Open the modal
        } catch (error) {
            console.error("Error Fetching order:", error);
        }
    };
    const generatePDF = () => {
        console.log("Order Data:", orderData);
        
        if (!orderData || !orderData.products) {
            console.error("Order data or products is undefined");
            return; 
        }
    
        const doc = new jsPDF();
        const logoImg = new Image();
        const logo = `${process.env.PUBLIC_URL}/img/logo.png`
        logoImg.src =logo;
        logoImg.onload = () => {
            doc.addImage(logo, 'PNG', 10, 10, 40, 40);
            
            doc.setFontSize(20);
            doc.text("SSV MESS", 60, 20);
            doc.setFontSize(12);
            doc.text("Phone No: +918870906831", 60, 30);
            doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 60, 40);
            doc.text(`Order Number: ${orderData._id}`, 60, 50);
            
            
            doc.line(10, 65, 200, 65);
            
            const headers = ["Product Name", "Quantity", "Price"];
            const startY = 75;
            let currentY = startY;
            
            doc.setFontSize(12);
            doc.setFillColor(200, 200, 200);
            doc.rect(10, currentY - 5, 190, 10, 'F');
            headers.forEach((header, index) => {
                doc.text(header, 20 + index * 60, currentY);
            });
            currentY += 10;
            
            let totalAmount = 0;
            
            orderData.products.forEach((product) => {
                doc.text(`${product.name}`, 20, currentY);
                doc.text(`${product.quantity}`, 80, currentY);
                doc.text(`₹${product.price.toFixed(2)}`, 140, currentY);
                totalAmount += product.price * product.quantity;
                currentY += 10;
            });
    
            doc.line(10, currentY, 200, currentY);
            currentY += 5;
    
            const gstPercentage = 18;
            const gstAmount = (totalAmount * gstPercentage) / 100;
            const finalAmount = totalAmount + gstAmount;
    
            doc.setFontSize(14);
            doc.text(`Subtotal: ₹${totalAmount.toFixed(2)}`, 20, currentY);
            currentY += 10;
            doc.text(`GST (${gstPercentage}%): ₹${gstAmount.toFixed(2)}`, 20, currentY);
            currentY += 10;
            doc.text(`Total Amount: ₹${finalAmount.toFixed(2)}`, 20, currentY);
            
            currentY += 15;
            doc.setFontSize(10);
            doc.text("Thank you for dining with us!", 20, currentY);
            currentY += 5;
            doc.text("Visit us again! Follow us on social media: @SSVMess", 20, currentY);
            
            doc.save('order-details.pdf');
        };
    };
    
    

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out 
            ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
        >
            <button className="text-xl absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={toggleCart}>
                ✖
            </button>
            <h2 className="text-3xl font-semibold text-center mt-12 text-gray-800">Your Plate</h2>

            <div className="p-6 space-y-4 overflow-y-auto">
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm"
                        >
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">₹{item.price}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FaPlus
                                    className="text-green-500 cursor-pointer hover:text-green-700"
                                    onClick={() => handleQuantityChange(item, 'increase')}
                                />
                                <span className="text-lg">{quantities[item._id] || 1}</span>
                                <FaMinus
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    onClick={() => handleDecrease(item)}
                                />
                                <FaTrash
                                    className="text-gray-500 cursor-pointer hover:text-gray-700"
                                    onClick={() => deleteProduct(item._id)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No items in the cart.</p>
                )}
            </div>

            <div className="p-6">
                <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                >
                    <option value="">Select a table</option>
                    {tables.map(table => (
                        <option key={table._id} value={table._id}>
                            Table {table.table_no}
                        </option>
                    ))}
                </select>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold">
                    Total: ₹{cartItems.reduce((total, item) => total + item.price * (quantities[item._id] || 1), 0)}
                </h3>
                <button
                    className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>
                <button
                    className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => handleViewBill(selectedTable)}
                >
                    View Bill
                </button>
                
                <div>
            {/* Existing JSX code */}
            {orderData && (
                <button
                    onClick={generatePDF}
                    className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Download PDF
                </button>
            )}

             {/* Success Animation */}
             {isSuccessful && (
                <div className="flex justify-center items-center mt-4">
                    <DotLottieReact
                        src={`${process.env.PUBLIC_URL}/img/Animation - 1730121566930.lottie`}
                        loop={false}
                        autoplay
                        onComplete={() => setIsSuccessful(false)} // Hide animation after play
                    />
                </div>
            )}
        </div>
            </div>
        </div>
    );
};

export default SidePlate;
