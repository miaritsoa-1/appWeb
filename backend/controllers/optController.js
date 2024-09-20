const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Sample Controller to manage One-Time Password (OTP) logic
exports.sendOTP = catchAsyncErrors(async (req, res, next) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Logic to send OTP via SMS (stubbed for this example)
    console.log(`OTP sent to ${phone}: ${otp}`);

    res.status(200).json({
        success: true,
        message: `OTP sent to ${phone}`,
        otp
    });
});
