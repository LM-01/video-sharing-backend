import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, test, unsubscribe, update } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get("/test", test);

// update user
router.put("/:id", verifyToken, update);

// delete user
router.delete("/:id", deleteUser);

// get user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", subscribe);

// unsubscribe a user
router.put("/unsub/:id", unsubscribe);

// like a video
router.put("/like/:videoId", like);

// dislike a video
router.put("/dislike/:videoId", dislike);

export default router;