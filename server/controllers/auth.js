import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({name: req.body.name});
        
        if (!user) {
            res.status(404).send("User not found");
        }

        const isValid = await bcrypt.compare(req.body.password, user.password);

        if (!isValid) {
            res.status(401).send("Invalid password");
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json(others);

    } catch(err) {
        next(err);
    }
}