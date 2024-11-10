const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Product = require('./models/product.model');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
dotenv.config();
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');
// Path for deployment
const path = require('path');
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/client', clientRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files in production  
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, 'frontend', 'client_site', 'build')));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'client_site', 'build', 'index.html'));
  });
}

// Global error handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'An internal server error occurred' });
});

// Start the server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

