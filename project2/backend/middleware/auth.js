const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { useFallbackDb, findFallbackUserById } = require('../utils/authFallback');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'novareview-local-secret');

    if (useFallbackDb()) {
      const user = await findFallbackUserById(payload.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      const { password, ...safeUser } = user;
      req.user = safeUser;
      return next();
    }

    const user = await User.findById(payload.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
};

module.exports = { auth, adminAuth };
