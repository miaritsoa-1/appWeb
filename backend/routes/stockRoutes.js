const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllStocks, getStockById, createStock, updateStock, deleteStock} = require('../../controllers/commerce/stockController');


const upload = multer({ storage: storage });

router.get('/', getStock); 
router.post('/', createStock); 
router.get('/:id', getStockById); 
router.patch('/:id', updateStock); 
router.delete('/:id', deleteStock); 
export default router;

// module.exports = router;
