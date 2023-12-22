import mongoose from 'mongoose';

const SleepIntakeSchema = new mongoose.Schema({
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

const SleepIntake = mongoose.models.SleepIntake || mongoose.model('SleepIntake', SleepIntakeSchema);

export default SleepIntake;
