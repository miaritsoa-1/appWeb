const jwt = require('jsonwebtoken');

// Create and send token
const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });

    res.status(statusCode).json({
        success: true,
        token
    });
};

module.exports = sendToken;
