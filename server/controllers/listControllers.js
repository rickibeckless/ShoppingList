import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import List from '../models/listModel.js';
import ListContainer from '../models/listContainerModel.js';

const cList = async (req, res) => { // Create one list
    try {
        const { userId, title, notes } = req.body;

        let listContainer = await ListContainer.findOne({ userId });

        if (!listContainer) {
            listContainer = new ListContainer({ userId: userId, lists: [] });
        };

        const newList = new List({
            userId,
            title,
            notes,
            items: [],
        });
        
        const savedList = await newList.save();

        listContainer.lists.push(savedList._id);
        await listContainer.save();

        res.status(201).json(savedList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when creating the list" });
    };
};

const rAList = async (req, res) => { // Read all lists
    try {
        const { userId } = req.params;
        const lists = await List.find({ userId });

        res.status(200).json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when finding lists" });
    };
};

const rList = async (req, res) => { // Read one list
    try {
        const { userId, listId } = req.params;
        const list = await List.findOne({ _id: listId });

        res.status(200).json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when finding list" });
    }
};

const uList = async (req, res) => { // Update one list

};

const dAList = async (req, res) => { // Delete all lists

};

const dList = async (req, res) => { // Delete one list
    
};

export { cList, rAList, rList, uList, dAList, dList };