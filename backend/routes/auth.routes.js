import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Define the /signup route
router.post("/signup", signup);  //browser sa tabi handel hoga jab post req aayi ispar

// Define the /login route
router.post("/login", login);

// Define the /logout route
router.post("/logout", logout);

// Export the router
export default router;
