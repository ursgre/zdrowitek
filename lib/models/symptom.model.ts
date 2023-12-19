import mongoose from 'mongoose';

const symptomSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    creator: String,
});

const Symptom = mongoose.model('Symptoms', symptomSchema);
export default Symptom;