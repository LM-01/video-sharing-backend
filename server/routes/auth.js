import express from 'express';
import { signin, signup } from '../controllers/auth.js';
import { test } from '../controllers/comment.js';

const router = express.Router();

// Create user
router.post('/signup', signup);

// Sign in
router.post('/signin', signin);

// Google AUTH
router.post('/google', test);


router.get("/test", test);

export default router;