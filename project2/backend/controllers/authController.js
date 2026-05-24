const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { validateEmail, validatePassword } = require('../utils/validator');
const { useFallbackDb, findFallbackUserByEmail, createFallbackUser } = require('../utils/authFallback');

const findUserByEmail = async (email) => {
  if (!useFallbackDb()) {
    return User.findOne({ email });
  }
  return findFallbackUserByEmail(email);
};

const signToken = (user) => {
  const secret = process.env.JWT_SECRET || 'novareview-local-secret';
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, secret, {
    expiresIn: '7d',
  });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Invalid email or password. Password needs 8+ characters.' });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'A user with that email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = useFallbackDb()
      ? await createFallbackUser({ name, email, password: hashedPassword })
      : await User.create({ name, email, password: hashedPassword });
    const token = signToken(user);
    res.status(201).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const token = signToken(user);
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    const { email, name, googleId } = req.body;
    if (!email || !googleId) {
      return res.status(400).json({ error: 'Google login requires email and googleId.' });
    }
    let user = await findUserByEmail(email);
    if (!user) {
      user = useFallbackDb()
        ? await createFallbackUser({ name, email, googleId })
        : await User.create({ name, email, googleId });
    } else if (!user.googleId && !useFallbackDb()) {
      user.googleId = googleId;
      await user.save();
    }
    const token = signToken(user);
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const { password, ...user } = req.user || {};
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, googleLogin, currentUser };
