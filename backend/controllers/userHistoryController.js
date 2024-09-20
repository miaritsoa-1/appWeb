const UserHistory = require('../models/userHistoryModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Get all user histories
exports.getUserHistory = catchAsyncErrors(async (req, res, next) => {
    const histories = await UserHistory.find();
    res.status(200).json({
        success: true,
        data: histories
    });
});
