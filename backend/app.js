const express = require('express');
const authRoutes = require('./routes/authRoutes');
const plantationRoutes = require('./routes/plantationRoutes'); // Ajout de cette ligne

const app = express();

app.use(express.json());

// Utilisation de la route d'authentification
app.use('/api/auth', authRoutes);

// Utilisation de la route plantation
app.use('/api/v1/plantation', plantationRoutes); // Ajout de cette ligne

module.exports = app;
