import express from "express";
import dotenv from "dotenv";

// Initialization
dotenv.config();
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

// Server Listen
app.listen(3000, () => console.log("Listening on Port: 3000."));