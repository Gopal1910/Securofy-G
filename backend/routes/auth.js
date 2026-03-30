import express from 'express';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();


// ================= COOKIE OPTIONS =================
const getCookieOptions = () => ({
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/', // ✅ VERY IMPORTANT (missing piece)
  domain: '.onrender.com',
});


// ================= FORMAT USER =================
const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  language: user.language,
});


// ================= REGISTER =================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res
      .status(201)
      .cookie('token', token, getCookieOptions())
      .json({
        success: true,
        message: 'Registration successful',
        user: formatUser(user),
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }



    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res
      .status(200)
      .cookie('token', token, getCookieOptions())
      .json({
        success: true,
        message: 'Login successful',
        user: formatUser(user),
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});








// ================= CURRENT USER =================
router.get('/me', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: formatUser(req.user),
  });
});


// ================= LOGOUT =================
router.post('/logout', (req, res) => {
 res.clearCookie('token', {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
  domain: '.onrender.com',
});

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});


export default router;