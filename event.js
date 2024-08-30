const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    allDay: { type: Boolean, default: true }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
