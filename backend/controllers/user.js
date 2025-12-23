const userService = require('../services/user');
const authService = require('../services/auth');

// Get logged-in user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List users (admin)
exports.listUsers = async (req, res) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const users = await userService.getAll({}, Number(limit), Number(skip));
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user role (admin)
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const valid = ['user', 'moderator', 'admin'];
    if (!valid.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    const updated = await userService.updateRole(id, role);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user (admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    res.json({ message: 'User deleted successfully', user: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.createUser({ name, email, password, role });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
