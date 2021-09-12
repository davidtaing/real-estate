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

/**
 * Default Error Handler
 * Note: More Specific Errors Belong in Route Handlers
 */
app.use((err, req, res, next) => {
  res.status(500).json({ status: 500, message: "Internal Server Error"});
})

// Server Listen
app.listen(3000, () => console.log("Listening on Port: 3000."));