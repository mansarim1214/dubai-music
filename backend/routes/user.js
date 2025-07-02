const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// require('dotenv').config(); // Ensure dotenv is required

const secretOrPrivateKey = `${process.env.JWT_SECRET}`

if (!secretOrPrivateKey) {

    console.error('JWT_SECRET environment variable is not set.');
    process.exit(1); // Exit process if the secret is not set
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, secretOrPrivateKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server errors' });
    }
});

module.exports = router;
