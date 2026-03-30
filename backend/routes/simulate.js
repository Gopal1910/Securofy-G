import express from 'express';
import Simulation from '../models/Simulation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Save simulation result
// @route   POST /api/simulate
router.post('/', protect, async (req, res) => {
  const { scenarioType, identifiedSafely, details } = req.body;
  
  try {
    const simulation = await Simulation.create({
      user: req.user._id,
      scenarioType,
      identifiedSafely,
      details,
    });
    
    // Broadcast simulation update to dashboard
    req.io.to(req.user._id.toString()).emit('activity_update', {
      type: 'simulation_completed',
      data: simulation
    });
    
    res.status(201).json({ success: true, data: simulation });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Errror' });
  }
});

// @desc    Get user's simulation history
// @route   GET /api/simulate
router.get('/', protect, async (req, res) => {
  try {
    const simulations = await Simulation.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, data: simulations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Errror' });
  }
});

export default router;
