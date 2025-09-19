import express from 'express';
import { AuthService } from '../services/authService.js';
const router = express.Router();
const authService = new AuthService();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const newUser = await authService.registerUser(email, password);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router; 