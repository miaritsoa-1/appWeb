import Stock from '../models/stockModel.js';
import errorHandler from '../utils/errorHandler.js';

export const createStock = async (req, res) => {
  try {
    const { quantity, product } = req.body;
    const newStock = new Stock({ quantity, product });
    const savedStock = await newStock.save();
    res.status(201).json({ success: true, data: savedStock });
  } catch (error) {
    errorHandler.handleError(res, error, 400, 'Erreur lors de la création du stock');
  }
};

export const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);
    if (!stock) {
      throw new errorHandler.CustomError('Stock non trouvé', 404);
    }
    res.status(200).json({ success: true, data: stock });
  } catch (error) {
    errorHandler.handleError(res, error, error.statusCode || 500, error.message);
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStock) {
      throw new errorHandler.CustomError('Stock non trouvé', 404);
    }
    res.status(200).json({ success: true, data: updatedStock });
  } catch (error) {
    errorHandler.handleError(res, error, error.statusCode || 500, error.message);
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStock = await Stock.findByIdAndDelete(id);
    if (!deletedStock) {
      throw new errorHandler.CustomError('Stock non trouvé', 404);
    }
    res.status(200).json({ success: true, message: 'Stock supprimé' });
  } catch (error) {
    errorHandler.handleError(res, error, error.statusCode || 500, error.message);
  }
};
