import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI and connection
const mongoURI = 'mongodb://localhost:27017/cabbooking';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Schema for User and Driver
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  password: String,
  role: String,  // 'user' or 'driver'
});

const driverSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobileNumber: String,
  password: String,
  role: { type: String, default: 'driver' },
  license: String,
  vehicleReg: String,
});

// Models
const User = mongoose.model('User', userSchema);
const Driver = mongoose.model('Driver', driverSchema);

// Sign Up Route
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password, role, license, vehicleReg } = req.body;

  if (!firstName || !lastName || !email || !mobileNumber || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await (role === 'driver' ? Driver : User).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === 'user') {
      newUser = new User({ firstName, lastName, email, mobileNumber, password: hashedPassword, role });
    } else if (role === 'driver') {
      if (!license || !vehicleReg) {
        return res.status(400).json({ error: 'License and vehicle registration are required for drivers' });
      }
      newUser = new Driver({ firstName, lastName, email, mobileNumber, password: hashedPassword, role, license, vehicleReg });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    await newUser.save();
    res.status(200).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  console.log('Received login request:', { email, password, role });

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    let user;
    if (role === 'user') {
      user = await User.findOne({ email });
    } else if (role === 'driver') {
      user = await Driver.findOne({ email });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile Route
app.get('/profile', async (req, res) => {
  const { email, role } = req.query;

  try {
    let user;
    if (role === 'user') {
      user = await User.findOne({ email });
    } else if (role === 'driver') {
      user = await Driver.findOne({ email });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Decentralized Cab Booking System API!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
