const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    monthlyIncome: { type: Number, required: true },
    otherIncome: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming income is linked to a user
    date: { type: Date, default: Date.now }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
