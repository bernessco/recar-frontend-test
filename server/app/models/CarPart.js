const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarPartSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Car part name is required.']
    },
    price: {
        type: Number,
        required: [true, 'Car part price is required.']
    },
    manufacturer: {
        type: String,
        required: [true, 'Car part manufacturer is required.']
    },
    model: {
        type: String,
        required: [true, 'Car part model is required.']
    },
    year: {
        type: Number,
        required: [true, 'Car part year is required.']
    },
    color: {
        type: String,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CarPart', CarPartSchema);