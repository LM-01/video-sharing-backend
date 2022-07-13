import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log(err);
    });
};

app.listen(8800, () => {
    connect();
    console.log("Connected to port 8800");
})