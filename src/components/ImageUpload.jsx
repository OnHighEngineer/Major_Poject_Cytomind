import React, { useState } from 'react';
import { FileUp, AlertCircle } from 'lucide-react';
import { api } from '../lib/api';

const ImageUpload = ({ patientData, onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid image file (JPG, PNG, or TIFF)');
      return;
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (selectedFile.size > maxSize) {
      setError('File size must be less than 50MB');
      return;
    }

    setError('');
    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !patientData) {
      setError('Please select an image and enter patient data');
      return;
    }
    
    setUploading(true);
    setError('');

    try {
      const result = await api.uploadImage(file, patientData);
      onUploadComplete(result);
    } catch (error) {
      setError(error.message || 'Upload failed. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Bone Marrow Image</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition">
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/tiff"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <FileUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2 font-medium">
            {file ? file.name : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-gray-500">JPG, PNG or TIFF (max 50MB)</p>
        </label>
      </div>

      {preview && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-cover rounded-lg border border-gray-200" 
          />
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading || !patientData}
        className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Uploading and Processing...
          </>
        ) : (
          'Upload and Analyze'
        )}
      </button>
    </div>
  );
};

export default ImageUpload;