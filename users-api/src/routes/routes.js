import express from "express";

const router = express.Router();

/**
 * POST /login
 * @description: Returns JWT Token if successful
 * @response: 200 - OK
 * @response: 400 - Bad Request (Failed Input Validation)
 * @response: 401 - Unauthorized (Invalid Credentials)
 */

/**
 * POST /register
 * @description: User Registration Route. Does not return a JWT Token if successful and forces a user to login.
 * @response: 204 - No Content
 * @response: 400 - Bad Request
 */

export default router;