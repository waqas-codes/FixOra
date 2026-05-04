import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Ali', skill: 'Electrician' },
    { id: 2, name: 'Ahmed', skill: 'Plumber' },
    { id: 3, name: 'Khan', skill: 'Mechanic' }
  ]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/requests');
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/requests/${id}/status`, { status });
      alert('Status updated successfully');
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const assignWorker = async (id, workerName) => {
    try {
      await api.put(`/requests/${id}/assign`, { workerName });
      alert('Worker assigned successfully');
      fetchRequests();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to assign worker');
    }
  };

  const [workerForm, setWorkerForm] = useState({
    name: '',
    skill: '',
    availability: 'Available'
  });

  const menuItems = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'requests', label: 'Service Requests' },
    { id: 'workers', label: 'Workers' },
    { id: 'assign', label: 'Assign Jobs' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const handleAddWorker = (e) => {
    e.preventDefault();
    if (!workerForm.name || !workerForm.skill) return alert('Please fill all fields');
    addWorker(workerForm);
    setWorkerForm({ name: '', skill: '', availability: 'Available' });
    alert('Worker added successfully!');
  };

  // Dynamic Stats
  const stats = [
    { label: 'Total Requests', value: requests.length },
    { label: 'Pending Requests', value: requests.filter(r => r.status === 'Pending').length },
    { label: 'Active Workers', value: workers.length },
    { label: 'Completed Jobs', value: requests.filter(r => r.status === 'Completed').length },
  ];

  // Render components based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#151c2c] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
              </div>
            ))}
          </div>
        );
      case 'requests':
        return (
          <div className="bg-white dark:bg-[#151c2c] rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
            {requests.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Assigned</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Customer</p>
                        <p className="text-[10px] text-slate-500">{req.date}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{req.serviceType}</td>
                      <td className="px-6 py-4">
                        <select 
                          value={req.status}
                          disabled={req.status === 'Completed'}
                          onChange={(e) => {
                            updateStatus(req.id, e.target.value);
                            alert('Status updated successfully');
                          }}
                          className={`bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-lg text-[10px] font-bold px-2 py-1 outline-none ${req.status === 'Completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {req.assignedWorker || "None"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select 
                            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-lg text-[10px] px-2 py-1 outline-none"
                            onChange={(e) => {
                              assignWorker(req.id, e.target.value);
                              alert('Worker assigned successfully');
                            }}
                            value={req.assignedWorker || ""}
                            disabled={req.status === 'Completed'}
                          >
                            <option value="">Select Worker</option>
                            {workers.map(w => <option key={w.id} value={w.name}>{w.name} ({w.skill})</option>)}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-20 text-center">
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">No service requests yet</p>
              </div>
            )}
          </div>
        );
      case 'workers':
        return (
          <div className="space-y-8">
            {/* Add Worker Form */}
            <div className="max-w-xl bg-white dark:bg-[#151c2c] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-indigo-500">Add New Worker</h3>
              <form onSubmit={handleAddWorker} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 ml-1">Name</label>
                  <input 
                    type="text" 
                    value={workerForm.name}
                    onChange={(e) => setWorkerForm({...workerForm, name: e.target.value})}
                    placeholder="Worker Name"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 ml-1">Skill</label>
                  <select 
                    value={workerForm.skill}
                    onChange={(e) => setWorkerForm({...workerForm, skill: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none text-xs"
                  >
                    <option value="">Select Skill</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Cleaner">Cleaner</option>
                  </select>
                </div>
                <button type="submit" className="bg-indigo-500 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-600 transition-all text-xs shadow-lg shadow-indigo-500/20">
                  Add Worker
                </button>
              </form>
            </div>

            {/* Workers List */}
            <div className="bg-white dark:bg-[#151c2c] rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Worker Name</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Skill</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{worker.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{worker.skill}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${
                          worker.availability === 'Available' ? 'text-green-500' : 'text-amber-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${worker.availability === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          {worker.availability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'assign':
        return (
          <div className="max-w-xl bg-white dark:bg-[#151c2c] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
            <h3 className="text-lg font-bold mb-6">Assign New Job</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Request</label>
                <select className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 text-sm">
                  <option>John Doe - Electrical (Pending)</option>
                  <option>Sarah Wilson - Painting (Pending)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Worker</label>
                <select className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl outline-none focus:border-indigo-500 text-sm">
                  <option>Robert Fox (Electrician)</option>
                  <option>Jenny Wilson (Cleaner)</option>
                  <option>Albert Flores (Painter)</option>
                </select>
              </div>
              <button className="w-full py-3 mt-4 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                Assign Job
              </button>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#151c2c] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total Earnings</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$12,450.00</h3>
              <p className="text-xs text-green-500 mt-2 font-medium">↑ 12% from last month</p>
            </div>
            <div className="bg-white dark:bg-[#151c2c] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Jobs Completed</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">842</h3>
              <p className="text-xs text-slate-500 mt-2 font-medium">Average 28 jobs / week</p>
            </div>
            <div className="bg-white dark:bg-[#151c2c] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Worker Performance</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">94%</h3>
              <p className="text-xs text-blue-500 mt-2 font-medium">Customer satisfaction rate</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white transition-colors duration-500 font-sans">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-[#151c2c] border-r border-slate-200 dark:border-white/5 p-6 flex-col shrink-0">
        <div className="mb-10">
          <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-slate-900 dark:text-white">Fix</span>
            <span className="text-indigo-500">Ora</span>
            <span className="text-[10px] ml-2 px-1.5 py-0.5 bg-indigo-500/10 text-indigo-500 rounded font-bold uppercase tracking-widest">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
          <Link 
            to="/signin" 
            onClick={() => localStorage.removeItem("user")}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-500 transition-colors px-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white dark:bg-[#151c2c] border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between p-4 pb-2">
          <Link to="/" className="text-lg font-bold tracking-tight">
            <span className="text-slate-900 dark:text-white">Fix</span>
            <span className="text-indigo-500">Ora</span>
            <span className="text-[10px] ml-1 px-1 bg-indigo-500/10 text-indigo-500 rounded uppercase tracking-widest">Admin</span>
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">AD</div>
        </div>
        <div className="flex overflow-x-auto gap-2 px-4 pb-3 no-scrollbar">
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-1.5 text-[10px] font-bold rounded-full whitespace-nowrap transition-all ${
                activeTab === item.id 
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
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#0b0f19]">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-6 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Home</span>
          </Link>
          <header className="mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your agency operations and workers.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Admin User</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Manager</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                AD
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

export default AdminDashboard;
