import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log(err);
    });
};

app.use("/api/users", userRoutes);

app.listen(8800, () => {
    connect();
    console.log("Connected to Server");
})