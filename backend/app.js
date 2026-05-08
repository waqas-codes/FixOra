const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));

// Root Route
app.get('/', (req, res) => {
  res.send('FixOra API is running...');
});

module.exports = app;
