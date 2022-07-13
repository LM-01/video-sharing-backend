import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
    res.json("Its Successful");
}

// Function is async because we are making requests to the databse
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});

        await newUser.save();
        res.status(200).send("User created successfully");
    } catch(err) {
        next(err);
    }
}