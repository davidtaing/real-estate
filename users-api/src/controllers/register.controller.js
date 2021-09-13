// Google Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";

// Local auth object
import auth from "../firebase/auth";

const registerController = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // TODO Sanitize and Validate Input

    // Call Firebase
    const user = await createUserWithEmailAndPassword(auth, email, password);

    // Return HTTP 204
    res.status(204).json({});
  } catch (err) {
    if (process.env.node_env === 'development') {
      console.log(err.code);
    }

    switch (err.code) {
      // Handle "auth/email-already-in-use" error appropriately and respond with 204
      // status code. 
      case "auth/email-already-in-use":
        return res.status(204).json();
      case "auth/invalid-email":
      case "auth/weak-password":
        return res.status(400).json({ status: 400, message: "Bad Request"});
      default:
        return next(err);
    }
  }
};

export default registerController;