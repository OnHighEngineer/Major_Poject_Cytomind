import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  patientId: String,
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  status: { type: String, default: 'PENDING' },
  progress: { type: Number, default: 0 },
  result: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
