import express from 'express';
import OpenAI from 'openai';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

// @desc    Process chat message
// @route   POST /api/chat
router.post('/', protect, async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Securofy, a helpful and expert AI assistant specializing in digital fraud prevention, cybersecurity awareness, and identifying scams. Provide concise, clear, and reassuring answers to users who might be dealing with potential phishing, smishing, or general digital scams.' },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
    });
    
    const reply = completion.choices[0].message.content;
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('OpenAI Error:', error);
    // Dummy fallback for missing API key gracefully handling
    const reply = "I'm currently running in offline mode, but remember: always verify senders, don't click suspicious links, and never share OTPs or passwords.";
    res.status(200).json({ success: true, reply });
  }
});

export default router;
