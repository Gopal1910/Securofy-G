import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { generateToken, protect } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL;


// ================= COOKIE OPTIONS =================
const getCookieOptions = () => ({
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/', // ✅ VERY IMPORTANT (missing piece)
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
        user: formatUser(user),
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ================= GOOGLE LOGIN =================
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false, // ✅ IMPORTANT (no session dependency)
  })
);


// ================= GOOGLE CALLBACK =================
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login`,
    session: false, // ✅ IMPORTANT
  }),
  async (req, res) => {
    try {
      const token = generateToken(req.user._id);

      res.cookie('token', token, getCookieOptions());

      // ✅ redirect to frontend dashboard
      return res.redirect(`${CLIENT_URL}/dashboard`);

    } catch (error) {
      console.error(error);
      return res.redirect(`${CLIENT_URL}/login`);
    }
  }
);


// ================= CURRENT USER =================
router.get('/me', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: formatUser(req.user),
  });
});


// ================= LOGOUT =================
router.post('/logout', (req, res) => {
 res.cookie('token', 'none', {
  expires: new Date(Date.now() + 10 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/', // ✅ ADD HERE ALSO
});

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});


export default router;