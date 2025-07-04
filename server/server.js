// server.js - Main server file for the MERN blog application

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

// Import routes
const postRoutes = require('./routes/postRoute');
const authRoutes = require('./routes/authRoute');
const commentRoutes = require('./routes/commentRoute');
const userRoutes = require('./routes/userRoute');

// Load environment variables
dotenv.config();

// Debug: Log environment variables (remove in production)
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('SECRET:', process.env.SECRET ? '***' : 'undefined');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'http://localhost:3000', // Alternative local port
    'https://blogs-websi.netlify.app', // Your Netlify domain
    'https://*.netlify.app', // Any Netlify subdomain
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

// Connect to MongoDB and start server
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogsdb';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    console.error('Please check your MONGODB_URI in the .env file');
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

module.exports = app; 