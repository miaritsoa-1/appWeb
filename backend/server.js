import mongoose from 'mongoose';
import express from 'express';
import plantationRoutes from './routes/plantationRoutes.js'; // Corrigé pour inclure le fichier routes

const app = express();

// Middleware pour utiliser JSON
app.use(express.json());

// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/mangrove')
.then(() => {
    console.log('MongoDB connected');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Utilisation de la route plantation
app.use('/api/v1/plantation', plantationRoutes); // Assurez-vous que le fichier routes est correct

// Démarrage du serveur
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
