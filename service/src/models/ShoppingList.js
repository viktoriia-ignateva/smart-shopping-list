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
    items: [{
        name: { type: String, required: true },
        bought: { type: Boolean, default: false },
        lastBoughtDate: { type: Date, required: false },
        frequency: { type: Number, required: false },
    }],
})

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)