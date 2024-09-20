const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');

// Middleware to check if user is admin
exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new Error('Access denied. Admins only.'));
    }
    next();
});
