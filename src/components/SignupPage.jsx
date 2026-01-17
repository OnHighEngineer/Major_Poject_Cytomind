'use client';

import { useState } from 'react';
import { AlertCircle, Activity } from 'lucide-react';

const SignupPage = ({ onSwitchToLogin }) => {
  const [labName, setLabName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!labName || !email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labName, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Signup failed');
        setLoading(false);
        return;
      }

      setSuccess('Account created successfully. You can now log in.');
      setLabName('');
      setEmail('');
      setPassword('');
      setLoading(false);
    } catch (err) {
      setError('Something went wrong. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Lab Account</h1>
          <p className="text-gray-600">Register your laboratory</p>
        </div>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Laboratory Name"
            value={labName}
            onChange={(e) => setLabName(e.target.value)}
            className="w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="email"
            placeholder="Lab Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-indigo-600 font-medium hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
