// Google Firebase
import { signInWithEmailAndPassword } from "firebase/auth";

// Local auth object
import auth from "../firebase/auth";

const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // TODO Sanitize and Validate Input

    // Call Firebase
    const { user } = (await signInWithEmailAndPassword(auth, email, password));
    const jwt = user.stsTokenManager;

    // Return HTTP 200 & JWT Token if Successful
    res.status(200).json(jwt);
  } catch (err) {
    console.log(err.code);

    // For more info on Firebase Error Codes
    // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
    switch (err.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-email":
          return res.status(401).json({ status: 401, message: "Unauthorized: Invalid Email or Password."});
      case "auth/missing-email":
        return res.status(400).json({ status: 401, message: "Bad Request"});
      default:
        return next(err);
    }
  }
};

export default loginController;