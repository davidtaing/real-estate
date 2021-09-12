import express from "express";
import dotenv from "dotenv";

import routes from "./routes/routes";

// Initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(routes);

// Server Listen
app.listen(3000, () => console.log("Listening on Port: 3000."));