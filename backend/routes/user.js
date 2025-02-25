import express from "express";
import user from "../models/user";
import bcrypt from "bcrypt";
import { errorLogger } from "../middleware/log";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/register", errorLogger, async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // search for existing user via email or username
        const existingUser = await user.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email is already taken" });
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new user({
                name: name,
                username: username,
                email: email,
                password: hashedPassword
            });
            await newUser.save();
            res.status(200).json({ message: "User created successfully" });
        }
    }
    catch (error) {
        errorLogger(error, req, res);
    }
});


router.post("/login", errorLogger, async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await user.findOne({ username: username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        else {
            const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            const token = jwt.sign({
                id: existingUser._id,
                username: existingUser.username
            }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "User logged in successfully", token: token });
        }
    }
    catch (error) {
        errorLogger(error, req, res);
    }
});



export default router;