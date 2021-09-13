// Google Firebase
import { signInWithEmailAndPassword } from "firebase/auth";

// Local auth object
import auth from "../firebase/auth";

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // TODO Sanitize and Validate Input

    // Call Firebase
    let jwt = await signInWithEmailAndPassword(auth, email, password);
    
    // Return HTTP 200 & JWT Token if Successful
    res.status(200).json(jwt);
  } catch (err) {
    next(err);
  }
};

export default loginController;