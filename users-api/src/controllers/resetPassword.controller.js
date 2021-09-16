// Google Firebase
import { sendPasswordResetEmail } from "firebase/auth";

// Local auth object
import auth from "../firebase/auth";

const resetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("400");
    }

    await sendPasswordResetEmail(auth, email);
    return res.status(204).json();
  } catch (err) {
    if (err.message === "400")
      return res.status(400).json({ status: 400, message: "Bad Request"});

    switch(err.code) {
      // Appropiately handle user-not-found error and respond with 204 Status.
      case "auth/user-not-found":
        return res.status(204).json();
      case "auth/invalid-email":
        return res.status(400).json({ status: 400, message: "Bad Request"});
      default:
        return next(err);
    }
  }
};

export default resetPasswordController;