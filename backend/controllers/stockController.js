const Stock = require('../models/stockModel');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// Create Stock
exports.createStock = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user.id;
  const stock = await Stock.create(req.body);
  res.status(201).json({ success: true, stock });
});

// Get all Stocks
exports.getAllStocks = catchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stocks = await Stock.find().skip(skip).limit(limit);

    if (!stocks || stocks.length === 0) {
      throw new ErrorHandler('Stock non trouvé', 404);
    }

    res.status(200).json({ success: true, stocks });
  } catch (error) {
    next(error);
  }
});

// Get Stock by ID
exports.getStockById = catchAsyncErrors(async (req, res, next) => {
  const stock = await Stock.findById(req.params.id);

  if (!stock) {
    throw new ErrorHandler('Stock non trouvé', 404);
  }

  res.status(200).json({ success: true, stock });
});

// Update Stock
exports.updateStock = catchAsyncErrors(async (req, res, next) => {
  const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!stock) {
    throw new ErrorHandler('Stock non trouvé', 404);
  }

  res.status(200).json({ success: true, stock });
});

// Delete Stock
exports.deleteStock = catchAsyncErrors(async (req, res, next) => {
  const stock = await Stock.findByIdAndDelete(req.params.id);

  if (!stock) {
    throw new ErrorHandler('Stock non trouvé', 404);
  }

  res.status(200).json({ success: true, message: 'Stock supprimé avec succès!' });
});
