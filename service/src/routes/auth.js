const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ShoppingList = require('../models/ShoppingList')
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

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
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        // Save the user to the database
        await user.save()

        res.status(200).json({ message: 'User register successfully', token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error('Error occurred:', err.stack); // Log the error stack
        res.status(500).send('Server error')
    }
})

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

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'User logged in successfully', token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error('Error occurred:', err.stack);
        res.status(500).send('Server error')
    }
})

// Route to get all shopping lists for the authenticated user
router.get('/shopping-list', async (req, res) => {
    const userID = req.user.id

    try {
        const shoppingList = await ShoppingList.find({ userID: userID })

        res.status(200).json(shoppingList)
    } catch (error) {
        console.error('Error occurred:', error.stack)
        res.status(500).send('Server error, could not get shopping list')
    }
})

// Route to creat a new shopping list
router.post('/shopping-list', async (req, res) => {
    const {listName: name} = req.body
    const userID = req.user.id

    try {
        // create a new shopping list
        const shoppingList = new ShoppingList({userID, name})

        // save the shopping list
        await shoppingList.save()

        res.status(200).json(shoppingList)

    } catch (error) {
        console.log('Error occurred:', error.stack)
        res.status(500).send('Server error, could not create shopping list')
    }
})

// Route to update a shopping list
router.put('/shopping-list/:listId', async (req, res) => {
    const shoppingList_id = req.params.listId
    const updateData = req.body.updateData

    try {
        const shoppingList = await ShoppingList.findByIdAndUpdate(
            shoppingList_id,                // ID of the document
            {name: updateData},         // Update object
        )

        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        console.log('Error occurred:', error.stack)
        res.status(500).send('Server error, could not update shopping list')
    }
})

// Delete a shopping list
router.delete('/shopping-list/:listId', async (req, res) => {
    const shoppingList_id = req.params.listId

    try {
        const shoppingList = await ShoppingList.findByIdAndDelete(shoppingList_id)
        if (!shoppingList) {
            return res.status(404).json({ message: 'Shopping list not found' })
        }
        res.status(200).json({ message: 'Shopping list deleted' })
    } catch (error) {
        res.status(500).send('Server error, could not update shopping list')
    }
})

module.exports = router
