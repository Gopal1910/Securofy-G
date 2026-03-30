import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scenarioType: {
    type: String, // 'Phishing Email', 'Smishing SMS', 'Vishing Call', etc.
    required: true,
  },
  identifiedSafely: {
    type: Boolean,
    required: true,
  },
  details: {
    type: Object, // Extra interactive details
  }
}, { timestamps: true });

export default mongoose.model('Simulation', simulationSchema);
