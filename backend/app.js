import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  // Import cors package
import userRoutes from './routes/auth.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use('/signup', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cabbooking')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
