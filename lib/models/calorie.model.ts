import mongoose from 'mongoose';

const CalorieIntakeSchema = new mongoose.Schema({
  calories: {
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

const CalorieIntake = mongoose.models.CalorieIntake || mongoose.model('CalorieIntake', CalorieIntakeSchema);

export default CalorieIntake;