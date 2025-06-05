const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles:{
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    }
})
module.exports = mongoose.model('User', UserSchema)