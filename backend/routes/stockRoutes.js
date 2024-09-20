const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock
} = require('../../controllers/commerce/stockController');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/stocks');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});
const upload = multer({ storage: storage });

// Create a stock (POST)
router.route('/stock').post(createStock);

// Get all stocks (GET)
router.route('/stocks').get(getAllStocks);

// Get a single stock by ID (GET)
router.route('/stock/:id').get(getStockById);

// Update a stock (PUT)
router.route('/stock/:id').put(updateStock);

// Delete a stock (DELETE)
router.route('/stock/:id').delete(deleteStock);

// Admin routes for updating stock
// Uncomment when ready to use auth and roles middleware
// router.route('/admin/stock/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateStock);

module.exports = router;
