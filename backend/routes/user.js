const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { protect } = require('../middleware/auth');
const { permit } = require('../middleware/auth');


// any authenticated user
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateUser);

// admin routes
router.get('/', protect, permit('admin'), userController.listUsers);
router.patch('/:id/role', protect, permit('admin'), userController.updateRole);


module.exports = router;