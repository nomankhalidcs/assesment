// Backend: Node.js + Express + MongoDB

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT =  5000;
const MONGO_URI = 'mongodb://localhost:27017/'

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Define Mongoose Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
const User = mongoose.model('User', UserSchema);

// API Routes
app.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        
        const users = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await User.countDocuments(query);
        res.json({ users, total, page, limit });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
