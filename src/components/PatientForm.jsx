import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';

const PatientForm = ({ onSubmit, initialData = null }) => {
  const [patientId, setPatientId] = useState(initialData?.patientId || '');
  const [name, setName] = useState(initialData?.name || '');
  const [age, setAge] = useState(initialData?.age || '');
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [error, setError] = useState('');

  const searchPatient = async () => {
    if (!patientId) {
      setError('Please enter a Patient ID');
      return;
    }

    setSearching(true);
    setError('');
    setFound(false);

    try {
      const data = await api.getPatient(patientId);
      
      if (data.success && data.patient) {
        setName(data.patient.name);
        setAge(data.patient.age.toString());
        setFound(true);
      } else {
        setError('Patient not found. Please enter details manually.');
      }
    } catch (error) {
      setError('Patient not found. Please enter details manually.');
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = () => {
    if (!patientId || !name || !age) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(age) || parseInt(age) < 0 || parseInt(age) > 150) {
      setError('Please enter a valid age');
      return;
    }

    setError('');
    onSubmit({ 
      patientId: patientId.trim(), 
      name: name.trim(), 
      age: parseInt(age) 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h2>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient ID *
          </label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => {
              setPatientId(e.target.value);
              setFound(false);
              setError('');
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black outline-none"
          />
        </div>
        <button
          type="button"
          onClick={searchPatient}
          disabled={searching || !patientId}
          className="mt-8 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {searching ? (
            <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>

      {found && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center text-sm">
          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          Patient found in database
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center text-sm">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patient Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age *
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          min="0"
          max="150"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!patientId || !name || !age}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Image Upload
      </button>
    </div>
  );
};

export default PatientForm;