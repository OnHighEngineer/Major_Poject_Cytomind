'use client';
import { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';
import LoginPage from '../src/components/LoginPage';
import Dashboard from '../src/components/Dashboard';
import SignupPage from '../src/components/SignupPage';


export default function HomePage() {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return showSignup ? (
    <SignupPage onSwitchToLogin={() => setShowSignup(false)} />
  ) : (
    <LoginPage onSwitchToSignup={() => setShowSignup(true)} />
  );
}
