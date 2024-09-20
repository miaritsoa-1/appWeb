const Plantation = require('../../models/plantationModel');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

// Create Plantation
exports.createPlantation = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user.id;
  const plantation = await Plantation.create(req.body);
  res.status(201).json({ success: true, plantation });
});

// Get all Plantations
exports.getAllPlantations = catchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const plantations = await Plantation.find().skip(skip).limit(limit);

    if (!plantations || plantations.length === 0) {
      throw new ErrorHandler('Plantation non trouvée', 404);
    }

    res.status(200).json({ success: true, plantations });
  } catch (error) {
    next(error);
  }
});

// Get Plantation by ID
exports.getPlantationById = catchAsyncErrors(async (req, res, next) => {
  const plantation = await Plantation.findById(req.params.id);

  if (!plantation) {
    throw new ErrorHandler('Plantation non trouvée', 404);
  }

  res.status(200).json({ success: true, plantation });
});

// Update Plantation
exports.updatePlantation = catchAsyncErrors(async (req, res, next) => {
  const plantation = await Plantation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!plantation) {
    throw new ErrorHandler('Plantation non trouvée', 404);
  }

  res.status(200).json({ success: true, plantation });
});

// Delete Plantation
exports.deletePlantation = catchAsyncErrors(async (req, res, next) => {
  const plantation = await Plantation.findByIdAndDelete(req.params.id);

  if (!plantation) {
    throw new ErrorHandler('Plantation non trouvée', 404);
  }

  res.status(200).json({ success: true, message: 'Plantation supprimée avec succès!' });
});
