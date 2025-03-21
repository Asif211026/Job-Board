const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define API routes
// Using dynamic imports to handle potential errors more gracefully
try {
  // Define available routes
  app.use('/api/jobs', require('./routes/jobRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/applications', require('./routes/applicationRoutes'));
} catch (err) {
  console.error('Error loading routes:', err.message);
}

// Simple health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Mock API routes for testing without DB
app.get('/api/mock/jobs', (req, res) => {
  res.json({
    jobs: [
      {
        id: '1',
        title: 'Frontend Developer',
        company: 'Tech Solutions',
        location: 'Remote',
        type: 'Full-time',
        salary: '$80,000 - $100,000',
        description: 'Looking for a talented frontend developer...'
      },
      {
        id: '2',
        title: 'Backend Engineer',
        company: 'Data Systems',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$90,000 - $120,000',
        description: 'Experienced backend developer needed...'
      }
    ]
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// Database connection
const connectDB = async () => {
  // Only try to connect if a valid MONGODB_URI is provided
  if (!process.env.MONGODB_URI) {
    console.log('No MongoDB URI provided. Running in development mode without database.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    console.log('Continuing without database connection. Some features may not work properly.');
    // Don't exit the process to keep the server running
  }
};

// Connect to MongoDB
connectDB();

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 