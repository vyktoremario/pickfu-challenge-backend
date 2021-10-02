import express from 'express';
import { getAllAnswers } from '../controllers/answerController';
const router = express.Router();

/* GET home page. */
router.get('/answers', getAllAnswers);

export default router;
