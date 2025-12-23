const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get single user (exclude password)
exports.getById = (id) => User.findById(id).select('-password');

// Get all users with pagination
exports.getAll = (filter = {}, limit = 20, skip = 0) =>
  User.find(filter).select('-password').limit(limit).skip(skip);

// Create user
exports.createUser = async ({ name, email, password, role = 'user' }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  return user;
};

// Update user details (name, email)
exports.updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;
  await user.save();
  return user;
};

// Update role
exports.updateRole = async (id, role) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  user.role = role;
  await user.save();
  return user;
};

// Delete user
exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};
