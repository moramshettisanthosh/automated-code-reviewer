const mongoose = require('mongoose');

const fallbackUsers = [];

const useFallbackDb = () => mongoose.connection.readyState !== 1;

const findFallbackUserByEmail = async (email) => {
  return fallbackUsers.find((user) => user.email === email);
};

const findFallbackUserById = async (id) => {
  return fallbackUsers.find((user) => String(user._id) === String(id));
};

const createFallbackUser = async ({ name, email, password, googleId }) => {
  const existing = fallbackUsers.find((user) => user.email === email);
  if (existing) return existing;

  const newUser = {
    _id: `${Date.now()}`,
    name,
    email,
    password,
    googleId,
    role: 'user',
    createdAt: new Date(),
  };

  fallbackUsers.push(newUser);
  return newUser;
};

module.exports = {
  fallbackUsers,
  useFallbackDb,
  findFallbackUserByEmail,
  findFallbackUserById,
  createFallbackUser,
};
