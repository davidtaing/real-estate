import express from "express";

// Controllers
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import resetPassword from "../controllers/resetPassword.controller";

const router = express.Router();

/**
 * POST /login
 * @description: Returns JWT Token & Refresh Token if successful
 * @response: 200 - OK
 * @response: 400 - Bad Request (Failed Input Validation)
 * @response: 401 - Unauthorized (Invalid Credentials)
 */
router.post("/login", loginController);

/**
 * POST /register
 * @description: User Registration Route. Does not return a JWT Token if successful and forces a user to login.
 * @response: 204 - No Content
 * @response: 400 - Bad Request
 */
router.post("/register", registerController);

/**
 * POST /reset-password
 * @description: Reset Password Route
 */
router.post("/reset-password", resetPassword);


export default router;