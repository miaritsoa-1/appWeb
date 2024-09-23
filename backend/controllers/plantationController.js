import Plantation from '../models/plantationModel.js'; // Modèle Mongoose

// Créer une nouvelle plantation (POST)
const createPlantation = async (req, res) => {
    try {
        const plantation = new Plantation(req.body);
        await plantation.save();
        res.status(201).json(plantation);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de la plantation', error });
    }
};

// Obtenir toutes les plantations (GET)
const getAllPlantations = async (req, res) => {
    try {
        const plantations = await Plantation.find();
        res.status(200).json(plantations);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des plantations', error });
    }
};

// Obtenir une plantation par ID (GET)
const getPlantationById = async (req, res) => {
    try {
        const plantation = await Plantation.findById(req.params.id);
        if (!plantation) {
            return res.status(404).json({ message: 'Plantation non trouvée' });
        }
        res.status(200).json(plantation);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la plantation', error });
    }
};

// Mettre à jour une plantation par ID (PUT / PATCH)
const updatePlantationById = async (req, res) => {
    try {
        const plantation = await Plantation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!plantation) {
            return res.status(404).json({ message: 'Plantation non trouvée' });
        }
        res.status(200).json(plantation);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la plantation', error });
    }
};

// Supprimer une plantation par ID (DELETE)
const deletePlantationById = async (req, res) => {
    try {
        const plantation = await Plantation.findByIdAndDelete(req.params.id);
        if (!plantation) {
            return res.status(404).json({ message: 'Plantation non trouvée' });
        }
        res.status(200).json({ message: 'Plantation supprimée' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la plantation', error });
    }
};

export default {
    createPlantation,
    getAllPlantations,
    getPlantationById,
    updatePlantationById,
    deletePlantationById
};
