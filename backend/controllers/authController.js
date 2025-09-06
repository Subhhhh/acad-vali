// controllers/authController.js
const User = require('../models/user');
const { hashPassword, verifyPassword, signToken } = require('../utils/auth');

exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      email,
      passwordHash,
      role: role || 'user'
    });

    const token = signToken({ sub: user._id, email: user.email, role: user.role });

    return res.status(201).json({ token });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await verifyPassword(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({ sub: user._id, email: user.email, role: user.role });

    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
};
