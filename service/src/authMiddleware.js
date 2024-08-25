const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Auth Header:', authHeader);  // Debugging line
    console.log('Token:', token);  // Debugging line

    if (!token) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification error:', err);  // Debugging line
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = user;
        console.log('User authenticated:', user);  // Debugging line
        next();
    });
}

module.exports = authenticateToken;