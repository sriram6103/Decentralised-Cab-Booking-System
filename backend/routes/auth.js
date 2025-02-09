import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';   // Default import from user.js
import Driver from '../models/driver.js';  // Default import from driver.js

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password, role } = req.body;

  if (!firstName || !lastName || !email || !mobileNumber || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === 'user') {
      newUser = new User({
        firstName,
        lastName,
        email,
        mobileNumber,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ message: 'User registered successfully!' });
    } else if (role === 'driver') {
      const { license, vehicleReg } = req.body;
      if (!license || !vehicleReg) {
        return res.status(400).json({ error: 'License and vehicle registration number are required for drivers' });
      }
      newUser = new Driver({
        firstName,
        lastName,
        email,
        mobileNumber,
        password: hashedPassword,
        license,
        vehicleReg,
      });
      await newUser.save();
      res.status(200).json({ message: 'Driver registered successfully!' });
    } else {
      res.status(400).json({ error: 'Invalid role' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
