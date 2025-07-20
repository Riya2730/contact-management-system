const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    company: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);