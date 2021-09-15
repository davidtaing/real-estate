import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import csurf from "csurf";

import config from "./config/config";

import routes from "./routes/routes";

// Initialization
const { PORT } = config;
const app = express();

// Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(xss());
app.use(cookieParser());
// TODO: Fix unit tests failing from this.
app.use(csurf({ cookie: true }));

// Routes
app.use(routes);

// Error Handler for Invalid CSRF Token
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  res.send('form tampered with');
});

/**
 * Default Error Handler
 * Note: More Specific Errors Belong in Route Handlers
 */
app.use((err, req, res, next) => {
  console.log(err.code)
  res.status(500).json({ status: 500, message: "Internal Server Error"});
})

console.log(process.env.NODE_ENV);

// Server Listen
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));

// Export for Testing
export default app;