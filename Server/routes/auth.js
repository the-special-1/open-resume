// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/User'); // Import User model
const passport = require('passport');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user' // Default role for new users
        });
        
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login user
// routes/auth.js
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Send back user data (including role)
        const { password: _, ...userData } = user.dataValues;
        res.status(200).json(userData); // Send back user data including role
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
    const { role } = req.body; // Expecting role in the request body
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.role = role; // Update the user's role
        await user.save(); // Save changes to the database

        res.status(200).json(user); // Return updated user data
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Google authentication routes (as previously defined)
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// routes/auth.js
router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
    // Successful authentication, check user role and redirect accordingly.
    if (req.user.role === 'admin') {
        res.redirect('http://localhost:3001/admin'); // Redirect to admin page
    } else {
        res.redirect('http://localhost:3001'); // Redirect to home page for normal users
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3001'); // Redirect to your React app or wherever you want
});

router.get('/current_user', (req, res) => {
    res.send(req.user); // Send back the current user if logged in
});

module.exports = router;