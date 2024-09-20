const express = require('express');
const { getUserHistory } = require('../controllers/userHistoryController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.get('/history', isAuthenticatedUser, getUserHistory);

module.exports = router;
