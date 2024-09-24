import express from 'express';
import { createStock, getAllStocks, getStockById, updateStockById, deleteStockById } from '../controllers/stockController.js';

const router = express.Router();

router.post('/', createStock);
router.get('/', getAllStocks);
router.get('/:id', getStockById);
router.put('/:id', updateStockById);
router.delete('/:id', deleteStockById);

export default router;


// Dans stockRoutes.js
module.exports = (app) => {
    app.post('/api/create-stock', (req, res) => {
      console.log('Reçu une requête POST sur /api/create-stock');
      stockController.createStock(req, res);
    });
  };
  
  // Puis dans app.js
  require('./routes/stockRoutes')(app);
  const stockController = require('./controllers/stockController');
  