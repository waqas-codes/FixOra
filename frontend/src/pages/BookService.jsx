import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const BookService = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    location: '',
    workers: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.serviceType) {
      setFormData(prev => ({ ...prev, serviceType: location.state.serviceType }));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.serviceType || !formData.date || !formData.location || !formData.workers || !formData.description) {
      return alert('Please fill in all fields before submitting.');
    }

    try {
      setLoading(true);
      await api.post('/requests', {
        serviceType: formData.serviceType,
        date: formData.date,
        location: formData.location,
        workersRequired: formData.workers,
        description: formData.description
      });

      alert('Request Submitted Successfully!');

      // Reset Form
      setFormData({
        serviceType: '',
        date: '',
        location: '',
        workers: '',
        description: ''
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex items-center justify-center p-4 font-sans transition-colors duration-500 relative">
      <Link 
        to="/dashboard" 
        className="absolute top-6 left-6 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        <span>Back to Dashboard</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#151c2c] rounded-[1.5rem] p-6 shadow-sm border border-slate-100 dark:border-white/5">
          <header className="mb-6">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Book a Service</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Fill out the form to request a service.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Service Type</label>
              <select 
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white appearance-none"
              >
                <option value="">Select a service</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Carpenter">Carpenter</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Date</label>
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Location</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter service address"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* Workers Required */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Number of Workers Required</label>
              <input 
                type="number" 
                name="workers"
                value={formData.workers}
                onChange={handleChange}
                min="1"
                placeholder="1"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Describe the problem or requirements..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900 dark:text-white resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-indigo-500/20 mt-2"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
