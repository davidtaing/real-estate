import express from "express";
import dotenv from "dotenv";

<<<<<<< HEAD
import routes from "./routes/routes";

// Initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
=======
// Initialization
dotenv.config();
const app = express();
>>>>>>> e03dee67fa254014a1c68e8075a52eb1f0daeffa

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
<<<<<<< HEAD
app.use(routes);
=======
>>>>>>> e03dee67fa254014a1c68e8075a52eb1f0daeffa

// Server Listen
app.listen(3000, () => console.log("Listening on Port: 3000."));