import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    notes: { type: String, default: "", required: false },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    createdAt: { type: Date, default: Date.now },
});

const List = mongoose.model('List', listSchema);
export default List;