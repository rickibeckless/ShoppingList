import mongoose from "mongoose";

const listContainerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    createdAt: { type: Date, default: Date.now },
});

const ListContainer = mongoose.model('ListContainer', listContainerSchema);
export default ListContainer;