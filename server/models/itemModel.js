import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['grocery', 'hygiene', 'clothing', 'tech', 'books', 'household', 'pet'], required: true },
    notes: { type: String, default: "", required: false },
    price: { type: Number, default: 0, required: false },
    quantity: { type: Number, default: 1, required: true },
    importance: { type: Number, enum: [1, 2, 3], default: 1, required: true },
    isPurchased: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;