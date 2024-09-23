import mongoose from 'mongoose';

const plantationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    emplacement: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    superficie: {
        type: Number,
        required: true
    },
    datePlantation: {
        type: Date,
        default: Date.now
    }
});

const Plantation = mongoose.model('Plantation', plantationSchema);

export default Plantation;
