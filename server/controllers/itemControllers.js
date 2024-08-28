import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import List from '../models/listModel.js';
import ListContainer from '../models/listContainerModel.js';
import Item from '../models/itemModel.js';

const cItem = async (req, res) => {
    try {
        const { 
            userId,
            listId, 
            name,
            type,
            notes,
            price,
            quantity,
            importance,
            isPurchased,
        } = req.body;

        // console.log("HEY:", userId);
        // console.log("req.body:", req.body);

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).json({ message: "List not found" });
        };

        const newItem = new Item({
            userId,
            listId,
            name,
            type,
            notes,
            price,
            quantity,
            importance,
            isPurchased,
        });

        const savedItem = await newItem.save();

        list.items.push(savedItem._id);
        await list.save();

        res.status(201).json(savedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when adding item" });
    };
};

const rAItem = async (req, res) => {
    try {
        const { userId, listId } = req.params;
        const items = await Item.find({ userId, listId });

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when getting item" });
    };
};

const uItem = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { 
            userId,
            listId, 
            _id,
            isPurchased
        } = req.body;

        const item = await Item.findById(_id);

        if (!item) {
            return res.status(404).send("Item not found");
        }

        item.isPurchased = isPurchased;
        await item.save();

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when updating item" });
    };
};

export { cItem, rAItem, uItem };