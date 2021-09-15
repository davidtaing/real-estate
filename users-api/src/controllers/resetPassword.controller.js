// Google Firebase
import { sendPasswordResetEmail } from "firebase/auth";

// Local auth object
import auth from "../firebase/auth";

const resetPasswordController = async (req, res, next) => {
  try {
    res.status(501).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export default resetPasswordController;