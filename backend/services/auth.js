const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};


exports.register = async ({ name, email, password }) => {
    const exists = await User.findOne({ email });
    if (exists) throw new Error('User already exists');


    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = signToken(user);
    return { user, token };
};


exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    if (!user.password) throw new Error('Use Google login for this account');


    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');


    const token = signToken(user);
    return { user, token };
};


exports.loginWithGoogleUser = async (userFromPassport) => {
    // userFromPassport is the mongoose user object returned by passport
    const token = signToken(userFromPassport);
    return { user: userFromPassport, token };
};