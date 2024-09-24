import Stock from '../models/stockModel.js';
import errorHandler from '../utils/errorHandler.js';

// Créer un nouveau stock (POST)
const createStock = async (req, res) => {
    try {
        const { quantity, product } = req.body;
        const newStock = new Stock({ quantity, product });
        const savedStock = await newStock.save();
        res.status(201).json(savedStock);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du stock', error });
    }
};

// Obtenir tous les stocks (GET)
const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des stocks', error });
    }
};

// Obtenir un stock par ID (GET)
const getStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await Stock.findById(id);
        if (!stock) {
            return res.status(404).json({ message: 'Stock non trouvé' });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du stock', error });
    }
};

// Mettre à jour un stock par ID (PUT / PATCH)
const updateStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedStock) {
            return res.status(404).json({ message: 'Stock non trouvé' });
        }
        res.status(200).json(updatedStock);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du stock', error });
    }
};

// Supprimer un stock par ID (DELETE)
const deleteStockById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStock = await Stock.findByIdAndDelete(id);
        if (!deletedStock) {
            return res.status(404).json({ message: 'Stock non trouvé' });
        }
        res.status(200).json({ message: 'Stock supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du stock', error });
    }
};

export default {
    createStock,
    getAllStocks,
    getStockById,
    updateStockById,
    deleteStockById
};
