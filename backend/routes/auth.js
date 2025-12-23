const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');


// local register/login
router.post('/register', authController.register);
router.post('/login', authController.login);


// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
'/google/callback',
passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
authController.googleCallback
);


router.get('/google/failure', (req, res) => res.status(401).json({ error: 'Google auth failed' }));


module.exports = router;