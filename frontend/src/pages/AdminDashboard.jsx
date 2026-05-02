import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  UserCheck, 
  BarChart, 
  FileText, 
  Activity, 
  CheckCircle, 
  Circle, 
  Star,
  LogOut,
  ChevronLeft,
  Wrench,
  User
} from 'lucide-react';

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
      console.log('Admin requests data:', data);
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
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'workers', label: 'Workers', icon: Users },
    { id: 'assign', label: 'Assign Job', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
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
    { label: 'Total Requests', value: requests.length, icon: FileText },
    { label: 'Pending Requests', value: requests.filter(r => r.status === 'Pending').length, icon: Activity },
    { label: 'Active Workers', value: workers.length, icon: Users },
    { label: 'Completed Jobs', value: requests.filter(r => r.status === 'Completed').length, icon: CheckCircle },
  ];

  // Render components based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        return (
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 overflow-hidden">
            {requests.length > 0 ? (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Service</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Assigned</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {requests.map((req) => (
                    <tr key={req._id || req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{req.user?.name || "Unknown User"}</p>
                            <p className="text-[10px] text-slate-500">{req.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Wrench size={14} className="text-gray-400" />
                          {req.serviceType}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={req.status}
                          disabled={req.status === 'Completed'}
                          onChange={(e) => {
                            updateStatus(req.id, e.target.value);
                            alert('Status updated successfully');
                          }}
                          className={`bg-gray-50 dark:bg-gray-700 shadow-sm rounded-lg text-[10px] font-bold px-2 py-1 outline-none ${req.status === 'Completed' ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            className="bg-gray-50 dark:bg-gray-700 shadow-sm rounded-lg text-[10px] px-2 py-1 outline-none"
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
          <div className="space-y-6">
            {/* Add Worker Form */}
            <div className="max-w-xl bg-gray-200 dark:bg-gray-800 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] transition-all duration-300">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-indigo-500">Add New Worker</h3>
              <form onSubmit={handleAddWorker} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 ml-1">Name</label>
                  <input
                    type="text"
                    value={workerForm.name}
                    onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })}
                    placeholder="Worker Name"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 ml-1">Skill</label>
                  <select
                    value={workerForm.skill}
                    onChange={(e) => setWorkerForm({ ...workerForm, skill: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none text-xs"
                  >
                    <option value="">Select Skill</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Cleaner">Cleaner</option>
                  </select>
                </div>
                <button type="submit" className="bg-indigo-500 text-white font-bold py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-xs">
                  Add Worker
                </button>
              </form>
            </div>

            {/* Workers List */}
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] p-5 transition-all duration-300 overflow-hidden">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Worker Name</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Skill</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Availability</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {worker.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Wrench size={14} className="text-gray-400" />
                          {worker.skill}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${worker.availability === 'Available' ? 'text-green-500' : 'text-amber-500'
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
          <div className="max-w-xl bg-gray-200 dark:bg-gray-800 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] transition-all duration-300">
            <h3 className="text-lg font-bold mb-6">Assign New Job</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Request</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm">
                  <option>John Doe - Electrical (Pending)</option>
                  <option>Sarah Wilson - Painting (Pending)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Worker</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 shadow-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm">
                  <option>Robert Fox (Electrician)</option>
                  <option>Jenny Wilson (Cleaner)</option>
                  <option>Albert Flores (Painter)</option>
                </select>
              </div>
              <button className="w-full py-3 mt-4 bg-indigo-500 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                Assign Job
              </button>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200 dark:bg-gray-800 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300">
              <p className="text-sm text-gray-500 font-medium mb-1">Total Earnings</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$12,450.00</h3>
              <p className="text-xs text-green-500 mt-2 font-medium">↑ 12% from last month</p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300">
              <p className="text-sm text-gray-500 font-medium mb-1">Jobs Completed</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">842</h3>
              <p className="text-xs text-gray-500 mt-2 font-medium">Average 28 jobs / week</p>
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300">
              <p className="text-sm text-gray-500 font-medium mb-1">Worker Performance</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">94%</h3>
              <p className="text-xs text-green-500 mt-2 font-medium">Customer satisfaction rate</p>
            </div>
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
            <span className="text-[10px] ml-2 px-1.5 py-0.5 bg-indigo-500/10 text-indigo-500 rounded font-bold uppercase tracking-widest">Admin</span>
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
        <div className="pt-6 mt-auto">
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

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-gray-200 dark:bg-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
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
