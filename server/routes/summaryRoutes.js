import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createSummary, getSummaries } from '../controllers/summaryController.js';

const router = express.Router();

router.post("/create", authMiddleware, createSummary);
router.get("/list", authMiddleware, getSummaries)

export default router;