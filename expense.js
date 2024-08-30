const mongoose = require('mongoose');

// Define Expense schema
const expenseSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true }
});

// Create and export the model
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
