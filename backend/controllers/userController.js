import User from '../models/userModel.js';
import errorHandler from '../utils/errorHandler.js';

export const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    errorHandler.handleError(res, error, 400, 'Erreur lors de la création de l\'utilisateur');
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new errorHandler.CustomError('Utilisateur non trouvé', 404);
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    errorHandler.handleError(res, error, error.statusCode || 500, error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      throw new errorHandler.CustomError('Utilisateur non trouvé', 404);
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    errorHandler.handleError(res, error, error.statusCode || 500, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new errorHandler.CustomError('Utilisateur non trouvé', 404);
    }
    res.status(200).json({ success: true, message: 'Utilisateur supprimé' });
  } catch (error) {
    errorHandler.handleError(res, error, error.statusCode || 500, error.message);
  }
};
