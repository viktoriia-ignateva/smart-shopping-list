const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() for JSON parsing

// MongoDB connection
mongoose.connect('mongodb://localhost/shopping-list-app')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.send('API running'));

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));