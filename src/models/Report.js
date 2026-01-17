import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  jobId: String,
  patientId: String,
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  classification: String,
  malignancyPercentage: Number,
  confidence: Number,
  pdfUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
