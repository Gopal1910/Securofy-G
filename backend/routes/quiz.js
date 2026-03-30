import express from 'express';
import Quiz from '../models/Quiz.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Submit quiz result
// @route   POST /api/quiz
router.post('/', protect, async (req, res) => {
  const { level, score, totalQuestions } = req.body;
  try {
    const newQuiz = await Quiz.create({
      user: req.user._id,
      level,
      score,
      totalQuestions,
    });
    
    // Broadcast quiz update to dashboard
    req.io.to(req.user._id.toString()).emit('activity_update', {
      type: 'quiz_completed',
      data: newQuiz
    });
    
    res.status(201).json({ success: true, data: newQuiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Errror' });
  }
});

// @desc    Get user's all quiz history
// @route   GET /api/quiz
router.get('/', protect, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Errror' });
  }
});

export default router;
