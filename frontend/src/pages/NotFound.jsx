import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-100 p-8 md:p-12 rounded-3xl shadow-[-10px_-10px_20px_rgba(255,255,255,0.9),10px_10px_20px_rgba(0,0,0,0.05)] text-center">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-purple-500 drop-shadow-sm mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-8 font-medium">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gray-100 text-indigo-500 font-bold rounded-2xl shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.9),inset_4px_4px_10px_rgba(0,0,0,0.1)] transition-all duration-300"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
