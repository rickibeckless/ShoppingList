import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ListContainer from '../models/listContainerModel.js';

const cUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        };

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const savedUser = await newUser.save();

        const newListContainer = new ListContainer({
            userId: savedUser._id,
            items: [],
        });

        await newListContainer.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong when creating user and list" });
    };
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        };

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        };

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Something went wrong when logging in user" });
    };
};

const rUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.userId);
        if (!users) {
            res.status(404).send("Not found");
        } else {
            res.status(200).json(users);
        };
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user.');
    };
};

const rAUser = async (req, res) => {

};

const uUser = async (req, res) => {

};

const dAUser = async (req, res) => {

};

const dUser = async (req, res) => {

};



export { cUser, loginUser, rUser, rAUser, uUser, dAUser, dUser };