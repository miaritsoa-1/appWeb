const express = require('express');
const mongoose = require('mongoose');
const stockController = require('./controllers/stockController');

const app = express();

mongoose.connect('mongodb://localhost/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const plantationRoutes = require('./routes/plantationRoutes');
//const stockRoutes = require('./routes/stockRoutes');

app.use('/api/', authRoutes);
app.use('/api/v1/plantation', plantationRoutes);
//app.use('/api/v1/stock', stockRoutes);


module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


  