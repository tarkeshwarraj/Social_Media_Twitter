import express from "express";
import { commentOnPost, createPost, deletePost, getAllPosts, likeUnlikePost } from "../controllers/post.controller";
import { protectRoute } from "../middleware/protectRoute";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts)
router.post("/create", protectRoute,createPost)
router.post("/like/:id", protectRoute,likeUnlikePost)
router.post("/create", protectRoute, commentOnPost)
router.delete("/:id", protectRoute, deletePost)


export default router;