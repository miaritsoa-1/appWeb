import express from 'express';
import plantationController from '../controllers/plantationController.js'; // Corrigez le chemin si nécessaire

const router = express.Router();

// Définition des routes CRUD pour Plantation
router.post('/', plantationController.createPlantation);
router.get('/', plantationController.getAllPlantations);
router.get('/:id', plantationController.getPlantationById);
router.put('/:id', plantationController.updatePlantationById);
router.patch('/:id', plantationController.updatePlantationById);
router.delete('/:id', plantationController.deletePlantationById);

export default router;
