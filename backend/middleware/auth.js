// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function requireAuth(requiredRole) {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : null;

      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (requiredRole) {
        const user = await User.findById(decoded.sub);
        if (!user || user.role !== requiredRole) {
          return res.status(403).json({ error: 'Forbidden' });
        }
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error('Auth middleware error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = { requireAuth };
