const express = require('express');
const authRoutes = require('./routes/authRoutes'); //on peut modifier

const app = express();
app.use(express.json());

// Utilisation de la route d'authentification
app.use('/api/auth', authRoutes);

module.exports = app;
