import express from 'express';
import { register, login, logout } from '../controllers/authController.js'
import { refreshAccessToken } from '../controllers/tokenController.js';



const router = express.Router();


router.post("/register", register);
router.post("/login",login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout)

export default router;