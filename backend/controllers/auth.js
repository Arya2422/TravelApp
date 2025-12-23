const authService = require('../services/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Prevent normal users from registering as admin directly (optional security)
    const assignedRole = role && role === 'admin' ? 'admin' : 'user';

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: assignedRole,
    });

    // Sign token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
try {
const { email, password } = req.body;
const { user, token } = await authService.login({ email, password });
res.json({ user, token });
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.googleCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Option 1: Redirect to frontend with token
    res.redirect(`http://localhost:5173?token=${token}`);

    // Option 2 (if using popup flow):
    // res.json({ token, user });
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
};