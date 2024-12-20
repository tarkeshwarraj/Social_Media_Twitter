import express from "express";
import { login, signup, logout, getMe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me",protectRoute, getMe);

// Define the /signup route
router.post("/signup", signup);  //browser sa tabi handel hoga jab post req aayi ispar

// Define the /login route
router.post("/login", login);

// Define the /logout route
router.post("/logout", logout);

// Export the router
export default router;
