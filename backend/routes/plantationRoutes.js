const express = require('express');
const { authorizeRoles, isAuthenticatedUser } = require('../../middlewares/auth');
const router = express.Router();

// Importez Multer pour les uploads
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/plantations');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

const {
  getAllPlantations,
  getPlantationById,
  createPlantation,
  updatePlantation,
  deletePlantation,
} = require('../../controllers/agriculture/plantationController');

router.route('/plantation').post(createPlantation);

router.route('/plantations').get(getAllPlantations);
router.route('/plantation/:id').get(getPlantationById);
router.route('/plantation/:id').put(updatePlantation);
router.route('/plantation/:id').delete(deletePlantation);

// Routes administratives
router
  .route('/admin/plantation/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updatePlantation);

module.exports = router;
