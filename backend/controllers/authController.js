const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler  = require('../utils/errorHandler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');


exports.authenticateUser = catchAsyncErrors(async (req, res, next) => {
  
    const { email, password } = req.body;

    // Recherchez l'utilisateur par email
    const user = await User.findOne({ email });

    if (!user)  {
        return next(new ErrorHandler('User not found', 404));
    }

    // Verifiez le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return next(new ErrorHandler('Invalide password', 401));
    }

    return res.status(200).json({ success: true, message: 'User authenticated successfully' });

});


exports.registerMail = catchAsyncErrors(async (req, res, next) => {
     
      const { email, password } = req.body;

      // Verifiez si l'utilisateur avec cet email existe deja
      const existingUser = await User.findOne({ email });

      if (existingUser) {
           return next(new ErrorHandler('User with this email already exists', 404));
      }

      // Hachez le mot de passe avant de le stocker
      const hashedPassword = await bcrypt.hash(password, 10);

      // creer un nouvel utilisateur avec l'adresse e-mail et le mot de passe hashe
      const newUser = new User({ email, password: hashedPassword });

      // Enregistrez le nouvel utilisateur dans la base de  donnees
      await newUser.save();

      return res.status(201).json({ success: true, message: 'User registered successfully'});

});

exports.createResetSession = catchAsyncErrors(async (req, res, next) => {
     
     const { email } = req.body;

     // Recherchez l'utilisateur par son adresse e-mail
     const user = await User.findOne({ email });

     if (!user) {
         return next(new ErrorHandler('User not found', 404));
     }

     // Generez un jeton de reinitialisation ( peut etre un jeton JWT, un jeton unique)
     const resetToken = generateResetToken();

     // Sotckez le jeton de reinitialisation dans la base de donnees
     user.resetToken = resetToken;
     await user.save();

     // Envoyez le jeton de reinitialisation par e-mail
     sendResetTokenByEmail(user.email, resetToken);

     return res.status(200).json({ success: true, message: 'Reset session created'});

});

exports.verifyUser = catchAsyncErrors(async (req, res, next) => {
     
     const { email, resetToken } = req.body;

     // Recherchez l'utilisateur par son adresse e-mail
     const user = await User.findOne({ email, resetToken });

     if (!user) {
          return next(new ErrorHandler('User not found or invalid token', 404));
     }

     return res.status(200).json({ success: true, message: 'User verified successfully'});

});



const { authenticateUser } = require('./authController');

module.exports = {
  login: authenticateUser
};

const { registerMail } = require('./authController');

module.exports = {
  register: registerMail
};
