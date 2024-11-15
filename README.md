# Restaurant Website (MERN)

## Goal
The goal of this project is to build a website for restaurants to facilitate food ordering and order monitoring through an online platform.

## Technology Used
This project is built using the **MERN** stack:
- **MongoDB**
- **Express.js**
- **React**
- **Node.js**

## Journey
I began this project by studying **React**, followed by **MongoDB**, **Node.js**, and **Express.js**. After grasping the basics and understanding how these technologies integrate within the MERN stack, I decided to start a project to test my skills and implement what I’d learned.

Initially, I considered creating a social website like Instagram or Facebook. Later, I came up with the idea of a **QR-Based Restaurant Ordering System**. In this system, each table in the restaurant has a unique QR code. When a customer scans the QR code, they are redirected to a client page where they can order food directly.

### Features
- **Client Side:** Customers can view the menu and place orders from their tables using the QR code system.
    - ![Client Side](img/ClientSite.png)
    - ![Order Placement](img/ClientOrder.png)

- **Admin Side:** The admin can view and manage orders, including updating the status of each order. 
    - I initially considered implementing **WebSocket** for real-time updates, but I was unable to complete it due to limited knowledge of WebSocket at the time.
    - ![Order Management](img/OrderManagement.png)

- **CRUD Operations:** Admins have full control to manage tables, products, and categories with CRUD operations.

### API Development and Testing
For the backend API development, I used **Insomnia** to test the endpoints throughout the development process. Insomnia helped me verify that the routes were functioning as expected and allowed me to troubleshoot and debug issues efficiently. With Insomnia, I was able to:
  - Test CRUD operations for products, tables, and categories.
  - Simulate client-side requests to ensure the correct data was being returned.
  - Confirm the expected responses for different HTTP status codes, such as 200 (OK), 404 (Not Found), and 500 (Server Error).

Using Insomnia during development helped ensure the backend API was reliable and ready for integration with the frontend.

---
### Working of the site [ADMIN/CLIENT]
![Woking of the site](img/recording_of_website.mp4)
### Note
I am aware that similar systems already exist in the market, and my intention is not to revolutionize the industry. I undertook this project as a practical exercise to deepen my understanding of the MERN stack. This system includes multiple layers and functionalities, making it an excellent project to practice and enhance my skills in full-stack development.
