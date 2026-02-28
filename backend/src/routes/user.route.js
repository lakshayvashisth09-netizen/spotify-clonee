import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getLikedSongs, getMessages, toggleLike } from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);
router.get("/liked", protectRoute, getLikedSongs);
router.post("/liked/:songId", protectRoute, toggleLike);

export default router;
