const express = require('express');
const { isAuthenticatedUser, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', isAuthenticatedUser, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

module.exports = router;
