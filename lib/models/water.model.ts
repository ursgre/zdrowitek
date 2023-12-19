import mongoose from 'mongoose';

const WaterIntakeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const WaterIntake = mongoose.models.WaterIntake || mongoose.model('WaterIntake', WaterIntakeSchema);

export default WaterIntake;