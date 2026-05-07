import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import api from '../services/api';

const SignIn = () => {
  const [role, setRole] = useState('customer'); // customer or admin
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Please enter your details');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Role validation
      if (data.role !== role) {
        return setError('Unauthorized user');
      }

      // Store complete user data including token
      localStorage.setItem("user", JSON.stringify(data));

      // Role-based redirect
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0b0f19] dark:to-[#1a1f2e] flex items-center justify-center px-4 py-4 transition-colors duration-500 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#151c2c] rounded-[1.5rem] p-6 md:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-6 group w-fit"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Back to Home</span>
        </Link>
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="Local Service Agency" className="h-10 object-contain" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome Back</h1>
          <p className="text-sm text-slate-500 dark:text-gray-400">Please enter your details to sign in.</p>
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
            onClick={() => setRole('admin')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 relative z-10 ${role === 'admin' ? 'text-white' : 'text-slate-500 dark:text-gray-400'}`}
          >
            Admin
          </button>
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg transition-all duration-300 ease-out ${role === 'admin' ? 'left-[calc(50%+2px)]' : 'left-1'}`}
          />
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
              </span>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1.5 ml-1">
              <label className="text-xs font-medium text-slate-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-xs font-semibold text-indigo-500 hover:text-indigo-600">Forgot?</a>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center ml-1">
            <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-500 focus:ring-indigo-500" />
            <label htmlFor="remember" className="ml-2 text-xs text-slate-600 dark:text-gray-400">Keep me logged in</label>
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold ml-1">{error}</p>}

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/20">
            Login
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
          Don't have an account? <Link to="/signup" className="text-indigo-500 font-bold hover:text-indigo-600 ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
