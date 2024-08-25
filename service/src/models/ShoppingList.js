const mongoose = require('mongoose')

const ShoppingListSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)