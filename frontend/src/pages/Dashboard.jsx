import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  LayoutDashboard,
  ClipboardList,
  History,
  User,
  FileText,
  Activity,
  CheckCircle,
  LogOut,
  ChevronLeft,
  Star,
  MapPin,
  Calendar,
  Circle
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({ id: null, rating: 5, comment: '' });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/requests/my');
      setRequests(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'My Requests', icon: ClipboardList },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.comment) return alert('Please enter a comment');

    try {
      await api.put(`/requests/${reviewData.id}/review`, {
        rating: reviewData.rating,
        review: reviewData.comment
      });
      alert('Review submitted successfully');
      setReviewData({ id: null, rating: 5, comment: '' });
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  // Dynamic Stats
  const stats = [
    { label: 'Total Requests', value: requests.length, icon: FileText },
    { label: 'Active Requests', value: requests.filter(r => r.status !== 'Completed').length, icon: Activity },
    { label: 'Completed Requests', value: requests.filter(r => r.status === 'Completed').length, icon: CheckCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] flex justify-between items-center gap-4 transition-all duration-300 hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)]">
                <div>
                  <p className="text-xs uppercase text-gray-500 tracking-wide font-bold mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  <span className="text-green-600 bg-green-100 dark:bg-green-500/10 dark:text-green-400 text-xs px-2 py-1 rounded-full mt-2 inline-block font-bold">
                    +12.5%
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-tr from-pink-500 to-orange-400 shadow-lg shadow-orange-500/20">
                  <stat.icon size={20} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'requests':
        console.log('Rendering requests:', requests);
        return (
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 overflow-hidden">
            {requests.length > 0 ? (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service Type</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Worker</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Location</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {requests.map((req) => (
                    <tr key={req._id || req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        {req.serviceType}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          {req.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center w-fit gap-1 ${req.status === 'In Progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                          req.status === 'Assigned' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' :
                            'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                          }`}>
                          <Circle size={10} fill="currentColor" />
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          {req.assignedWorker || "Not Assigned"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-gray-400" />
                          {req.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-20 text-center">
                <p className="text-slate-500 dark:text-slate-400 font-medium">No requests yet</p>
                <Link to="/book-service" className="text-indigo-500 text-sm font-bold hover:underline mt-2 inline-block">Book your first service</Link>
              </div>
            )}
          </div>
        );
      case 'history':
        const completedRequests = requests.filter(r => r.status === 'Completed');
        return (
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 overflow-hidden">
            {completedRequests.length > 0 ? (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service Type</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Worker</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Review</th>
                  </tr>
                </thead>
                <tbody className="">
                  {completedRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{req.serviceType}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{req.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{req.assignedWorker}</td>
                      <td className="px-6 py-4">
                        {req.rating > 0 ? (
                          <div>
                            <div className="flex gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${i < req.rating ? 'text-amber-400' : 'text-slate-300'}`}>★</span>
                              ))}
                            </div>
                            <p className="text-xs text-slate-500 italic">"{req.review}"</p>
                          </div>
                        ) : (
                          <div>
                            {reviewingId === req.id ? (
                              <form onSubmit={(e) => handleReviewSubmit(e, req.id)} className="space-y-2 py-2">
                                <div className="flex items-center gap-2">
                                  <label className="text-[10px] font-bold uppercase text-slate-400">Rating:</label>
                                  <select
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="bg-gray-50 dark:bg-gray-700 shadow-sm rounded px-1 py-0.5 text-xs outline-none"
                                  >
                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                                  </select>
                                </div>
                                <textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Your feedback..."
                                  className="w-full bg-gray-50 dark:bg-gray-700 shadow-sm rounded-lg p-2 text-xs outline-none resize-none"
                                  rows="2"
                                />
                                <div className="flex gap-2">
                                  <button type="submit" className="bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-md">Submit</button>
                                  <button type="button" onClick={() => setReviewingId(null)} className="text-slate-400 text-[10px] font-bold">Cancel</button>
                                </div>
                              </form>
                            ) : (
                              <button
                                onClick={() => setReviewingId(req.id)}
                                className="px-4 py-1.5 border border-indigo-500 text-indigo-500 text-[10px] font-bold uppercase rounded-lg hover:bg-indigo-500 hover:text-white transition-all"
                              >
                                Leave Review
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-20 text-center text-slate-500 dark:text-slate-400 font-medium">
                No completed requests yet
              </div>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-xl bg-gray-200 dark:bg-gray-800 p-6 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] transition-all duration-300">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Profile Information</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Customer"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 ml-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none text-sm"
                />
              </div>
              <button className="w-full py-3 mt-4 bg-indigo-500 text-white font-bold rounded-xl hover:shadow-md transition-all duration-200 shadow-sm">
                Update Profile
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-200 dark:bg-gray-900 text-slate-900 dark:text-white transition-all duration-300 font-sans">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-gray-200 dark:bg-gray-800 shadow-[4px_0_12px_rgba(0,0,0,0.05)] rounded-r-2xl p-6 flex-col shrink-0 transition-all duration-300">
        <div className="mb-10">
          <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-slate-900 dark:text-white">Fix</span>
            <span className="text-indigo-500">Ora</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${activeTab === item.id
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.7),inset_3px_3px_6px_rgba(0,0,0,0.1)]'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-white shadow-none'
                }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
          <Link
            to="/signin"
            onClick={() => localStorage.removeItem("user")}
            className="flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors px-4"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Header - Full menu accessibility */}
      <div className="md:hidden sticky top-0 z-50 bg-gray-200 dark:bg-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between p-4 pb-2">
          <Link to="/" className="text-lg font-bold tracking-tight">
            <span className="text-slate-900 dark:text-white">Fix</span>
            <span className="text-indigo-500">Ora</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">JC</div>
        </div>
        <div className="flex overflow-x-auto gap-2 px-4 pb-3 no-scrollbar">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-1.5 text-[10px] font-bold rounded-full whitespace-nowrap transition-all ${activeTab === item.id
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-200 dark:bg-gray-900 transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-6 group"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
          <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">Track your service requests and manage your account.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">John Customer</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                JC
              </div>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
