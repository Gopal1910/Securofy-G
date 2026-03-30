import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

// ❌ REMOVE fallback localhost (important fix)
const CLIENT_URL = process.env.CLIENT_URL;

const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);

  res
    .status(statusCode)
    .cookie('token', token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,        // 🔥 required for production (HTTPS)
      sameSite: 'none',    // 🔥 required for cross-origin (Vercel + Render)
    })
    .json({
      success: true,
      message,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        language: user.language,
      },
      token,
    });
};

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    user = await User.create({ name, email, password });

    sendTokenResponse(user, 201, res, 'Registration successful');
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

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// ================= GOOGLE LOGIN =================
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ================= GOOGLE CALLBACK =================
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user._id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      // ✅ FINAL REDIRECT (NO LOCALHOST EVER)
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login`);
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