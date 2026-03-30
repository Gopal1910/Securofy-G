import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

// ✅ ALWAYS use env (NO fallback localhost)
const CLIENT_URL = process.env.CLIENT_URL;

// ================= COOKIE OPTIONS =================
const getCookieOptions = () => ({
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,        // 🔥 HTTPS required (Render + Vercel)
  sameSite: 'none',    // 🔥 cross-origin required
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
        user,
        token,
      });

  } catch (error) {
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

    if (!user.password && user.googleId) {
      return res.status(401).json({ success: false, message: 'Please login with Google' });
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
        user,
        token,
      });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ================= GOOGLE LOGIN =================
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ================= GOOGLE CALLBACK =================
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user._id);

      res.cookie('token', token, getCookieOptions());

      // ✅ ALWAYS redirect to frontend
      return res.redirect(`${CLIENT_URL}/dashboard`);

    } catch (error) {
      return res.redirect(`${CLIENT_URL}/login`);
    }
  }
);

// ================= CURRENT USER =================
router.get('/me', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ================= LOGOUT =================
router.post('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  if (req.logout) req.logout(() => {});

  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export default router;