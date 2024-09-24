import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
