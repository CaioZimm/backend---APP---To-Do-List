const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String,
        required: true,
        min: 4
    },
    // photo: {
    //     type: Image,
    //     default: null,
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetCode: {
        type: String
    },
    codeExpires: {
        type: Date
    }
});

module.exports = mongoose.model('User', userSchema);