import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import api from '../services/api';

const SignUp = () => {
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      return alert('Please fill in all fields');
    }

    try {
      const { data } = await api.post('/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role
      });

      localStorage.setItem("user", JSON.stringify(data));
      alert('Account created successfully!');

      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0b0f19] dark:to-[#1a1f2e] flex items-center justify-center px-4 py-4 transition-colors duration-500 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#151c2c] rounded-[1.5rem] p-6 md:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-6 group w-fit lg:absolute lg:top-8 lg:left-8 lg:mb-0"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Back to Home</span>
        </Link>
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4 lg:hidden">
            <img src={logo} alt="Local Service Agency" className="h-10 object-contain" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Create an Account</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">Sign up to get started with Local Service Agency.</p>
        </div>

        {/* Role Toggle */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-6 relative">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 relative z-10 ${role === 'customer' ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`}
          >
            Customer
          </button>
          <button
            type="button"
            className="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 relative z-10 text-slate-400 dark:text-gray-500 cursor-not-allowed opacity-50"
            disabled
            title="Admin registration is restricted"
          >
            Admin
          </button>
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transition-all duration-300 ease-out ${role === 'admin' ? 'left-[calc(50%+2px)]' : 'left-1'}`}
          />
        </div>

        <form className="space-y-3.5" onSubmit={handleSignUp}>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 ml-1">Full Name</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/20 mt-2">
            Sign Up
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-white/5"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="px-2 bg-white dark:bg-[#151c2c] text-slate-400 font-bold tracking-widest">Or continue with</span></div>
        </div>

        <button className="w-full py-2.5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-sm font-semibold text-slate-700 dark:text-gray-300">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>

        <p className="text-center mt-6 text-xs text-slate-500">
          Already have an account? <Link to="/signin" className="text-indigo-500 font-bold hover:text-indigo-600 ml-1">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
