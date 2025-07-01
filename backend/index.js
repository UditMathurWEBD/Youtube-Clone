import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors"
import { userRoutes } from "./Routes/userRoutes.js";
import { videoRoutes } from "./Routes/videoRoutes.js";

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
app.use(cors());

app.use(express.json());

db.on("open",()=>{
    console.log("Db connected succesfully")
})



app.listen(process.env.PORT,()=>{
    console.log(`Port is running ${process.env.PORT}`);
})

userRoutes(app);
videoRoutes(app);