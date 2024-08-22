const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret_key'

// Route for user registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        // Check if the user already exists
        let user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Create a new user
        user = new User({ username, password })

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {expiresIn: '1h'})

        // Save the user to the database
        await user.save()

        res.status(201).json({ message: 'User registered successfully', token })
    } catch (err) {
        console.error('Error occurred:', err.stack); // Log the error stack
        res.status(500).send('Server error')
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        res.status(200).json({ message: 'User logged in successfully' })
    } catch (err) {
        console.error('Error occurred:', err.stack);
        res.status(500).send('Server error')
    }
});

module.exports = router
