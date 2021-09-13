import express from "express";

import config from "./config/config";

import routes from "./routes/routes";

// Initialization
const { PORT } = config;
const app = express();

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

console.log(process.env.NODE_ENV);

// Server Listen
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));

// Export for Testing
export default app;