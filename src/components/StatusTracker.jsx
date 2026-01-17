import React, { useState, useEffect } from 'react';
import { Clock, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';

const StatusTracker = ({ jobId, onComplete }) => {
  const [status, setStatus] = useState('PENDING');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jobId) return;

    let interval;
    let attempts = 0;
    const maxAttempts = 150; // 5 minutes with 2-second intervals

    const checkStatus = async () => {
      try {
        const data = await api.getJobStatus(jobId);
        
        setStatus(data.status);
        setProgress(data.progress || 0);
        
        if (data.status === 'COMPLETED') {
          clearInterval(interval);
          if (onComplete) {
            onComplete(data.report);
          }
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          setError(data.message || 'Processing failed');
        }

        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setError('Processing timeout. Please contact support.');
        }
      } catch (error) {
        console.error('Status check failed:', error);
        attempts++;
        if (attempts >= 5) {
          clearInterval(interval);
          setError('Unable to check status. Please refresh the page.');
        }
      }
    };

    // Initial check
    checkStatus();

    // Poll every 2 seconds
    interval = setInterval(checkStatus, 2000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [jobId, onComplete]);

  const getStatusIcon = () => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'PROCESSING':
        return <Activity className="w-6 h-6 text-blue-500 animate-pulse" />;
      case 'COMPLETED':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'FAILED':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'PENDING': return 'text-yellow-700';
      case 'PROCESSING': return 'text-blue-700';
      case 'COMPLETED': return 'text-green-700';
      case 'FAILED': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Processing Status</h2>
      
      <div className="flex items-center mb-4">
        {getStatusIcon()}
        <span className={`ml-3 text-lg font-semibold ${getStatusColor()}`}>
          {status.replace('_', ' ')}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-center text-sm font-medium text-gray-600 mb-4">
        {progress}% Complete
      </p>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex justify-between items-center">
          <span>Image Validation</span>
          <span className="font-semibold">{progress >= 25 ? '✓' : '...'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Preprocessing</span>
          <span className="font-semibold">{progress >= 50 ? '✓' : '...'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>ML Model Inference</span>
          <span className="font-semibold">{progress >= 75 ? '✓' : '...'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Report Generation</span>
          <span className="font-semibold">{progress >= 100 ? '✓' : '...'}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;