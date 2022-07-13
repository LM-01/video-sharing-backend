import express from 'express';
import { signup } from '../controllers/auth.js';
import { test } from '../controllers/comment.js';

const router = express.Router();

// Create user
router.post('/signup', signup);

// Sign in
router.post('/signin', test);

// Google AUTH
router.post('/google', test);


router.get("/test", test);

export default router;