import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String // Optionnel pour la réinitialisation de mot de passe
});

const User = mongoose.model('User', userSchema);

export default User;
