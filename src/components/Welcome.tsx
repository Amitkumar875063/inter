import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onNavigate: (screen: 'login' | 'signup') => void;
}

export default function Welcome({ onNavigate }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to PopX</h1>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onNavigate('signup')}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-purple-100 text-purple-700 py-4 rounded-xl font-semibold text-lg hover:bg-purple-200 transform hover:scale-[1.02] transition-all duration-200"
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}