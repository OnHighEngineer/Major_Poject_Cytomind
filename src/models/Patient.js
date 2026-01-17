import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  name: String,
  age: Number,
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
