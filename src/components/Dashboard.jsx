import React, { useState } from 'react';
import { Microscope, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PatientForm from './PatientForm';
import ImageUpload from './ImageUpload';
import StatusTracker from './StatusTracker';
import ReportViewer from './ReportViewer';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [step, setStep] = useState('PATIENT'); // PATIENT → UPLOAD → STATUS → REPORT
  const [patientData, setPatientData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [report, setReport] = useState(null);

  const handlePatientSubmit = (data) => {
    setPatientData(data);
    setStep('UPLOAD');
  };

  const handleUploadComplete = (data) => {
    setJobData(data);
    setStep('STATUS');
  };

  const handleProcessingComplete = (reportData) => {
    setReport(reportData);
    setStep('REPORT');
  };

  const handleReset = () => {
    setStep('PATIENT');
    setPatientData(null);
    setJobData(null);
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Microscope className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Cytomind
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-700">
              <User className="w-4 h-4 mr-2" />
              {user?.email}
            </div>
            <button
              onClick={logout}
              className="flex items-center text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Workflow Indicator */}
        <div className="flex justify-between items-center mb-10">
          {['PATIENT', 'UPLOAD', 'STATUS', 'REPORT'].map((stage, index) => (
            <div key={stage} className="flex items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                  step === stage || ['STATUS', 'REPORT'].includes(stage) && step !== 'PATIENT'
                    ? 'bg-indigo-600'
                    : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {stage}
              </span>
              {index < 3 && (
                <div className="w-12 h-1 bg-gray-300 mx-3 rounded" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 'PATIENT' && (
          <PatientForm onSubmit={handlePatientSubmit} />
        )}

        {step === 'UPLOAD' && (
          <ImageUpload
            patientData={patientData}
            onUploadComplete={handleUploadComplete}
          />
        )}

        {step === 'STATUS' && (
          <StatusTracker
            jobId={jobData?.jobId}
            onComplete={handleProcessingComplete}
          />
        )}

        {step === 'REPORT' && (
          <div className="space-y-6">
            <ReportViewer report={report} />
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Analyze Another Patient
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
