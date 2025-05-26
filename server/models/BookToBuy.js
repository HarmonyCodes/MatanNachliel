const mongoose = require('mongoose')
const bookToBuySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})
const BookToBuy = mongoose.model('BookToBuy', bookToBuySchema)