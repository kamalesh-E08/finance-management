const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const User = require('./form');
const Event = require('./event');
const Income = require('./income');
const Expense = require('./expense');

const app = express();
const port = process.env.PORT || 8002;
const mongodb = "mongodb://localhost:27017/main";

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../Frontend')));

// Connect to MongoDB
mongoose.connect(mongodb)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.redirect('/html/category.html');
        } else {
            res.redirect('/?error=invalid_credentials');
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Internal server error");
    }
});

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        const user = new User({ name, email, password });
        await user.save();
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Event routes
// app.get('/events', async (req, res) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json(events);
//     } catch (err) {
//         console.error("Error fetching events:", err);
//         res.status(500).send("Internal server error");
//     }
// });

// app.post('/events', async (req, res) => {
//     const { title, start, allDay } = req.body;
//     try {
//         const event = new Event({ title, start, allDay });
//         await event.save();
//         res.status(201).json(event);
//     } catch (err) {
//         console.error("Error creating event:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// app.put('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, start, allDay } = req.body;
//     try {
//         const event = await Event.findByIdAndUpdate(id, { title, start, allDay }, { new: true });
//         if (!event) {
//             return res.status(404).json({ error: "Event not found" });
//         }
//         res.status(200).json(event);
//     } catch (err) {
//         console.error("Error updating event:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// app.delete('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const event = await Event.findByIdAndDelete(id);
//         if (!event) {
//             return res.status(404).json({ error: "Event not found" });
//         }
//         res.status(200).json({ success: true });
//     } catch (err) {
//         console.error("Error deleting event:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// Income routes
app.post('/income', async (req, res) => {
    const { monthlyIncome, otherIncome } = req.body;

    try {
        // Assuming you're storing user information somewhere, replace 'userId' with actual logged-in user ID
        const userId = req.user._id;

        // Create a new Income record
        const income = new Income({ monthlyIncome, otherIncome, user: userId });
        await income.save();
        res.status(200).json({ success: true, message: "Income data saved successfully" });
    } catch (err) {
        console.error("Error saving income data:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Expense routes
app.post('/api/expenses', async (req, res) => {
    try {
        const { date, description, amount } = req.body;
        const newExpense = new Expense({ date, description, amount });
        await newExpense.save();
        res.status(200).json({ success: true, expense: newExpense });
    } catch (err) {
        console.error("Error adding expense:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({ success: true, expenses });
    } catch (err) {
        console.error("Error fetching expenses:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error deleting expense:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).send("Internal server error");
    }
});

app.post('/events', async (req, res) => {
    const { title, start, allDay } = req.body;
    try {
        const event = new Event({ title, start, allDay });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { title, start, allDay } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(id, { title, start, allDay }, { new: true });
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error("Error updating event:", err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({ error: err.message });
    }
});
