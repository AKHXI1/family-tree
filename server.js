require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const familyRoutes = require('./routes/family');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend')); // Serve static files from 'frontend' folder

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
