import express from 'express';
import { registerMail, authenticateUser } from '../controllers/authController.js';

const router = express.Router();

// Route pour l'inscription
router.post('/register', registerMail);

// Route pour la connexion
router.post('/login', authenticateUser);

export default router;
