const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    idUser: {
        type: Number,
    },
    idCategory: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Task', taskSchema)