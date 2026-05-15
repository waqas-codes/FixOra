import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
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
  User,
  Eye,
  Trash2,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [workerFilter, setWorkerFilter] = useState('All');

  useEffect(() => {
    fetchRequests();
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const { data } = await api.get('/workers');
      setWorkers(data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

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
    if (status === 'Completed') {
      const req = requests.find(r => (r._id === id || r.id === id));
      if (!req?.assignedWorkers || req.assignedWorkers.length === 0) {
        return alert('Please assign worker(s) before completing request.');
      }
    }
    try {
      const { data } = await api.put(`/requests/${id}/status`, { status });
      // Update local state instantly with returned data
      setRequests(prev => prev.map(req => (req._id === id || req.id === id) ? data : req));
      console.log('Status updated to:', status);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
      fetchRequests(); // Revert on error
    }
  };

  const assignWorkers = async (id, workerNames) => {
    try {
      const { data } = await api.put(`/requests/${id}/assign`, { workerNames });
      setRequests(prev => prev.map(req => (req._id === id || req.id === id) ? data : req));
      console.log('Workers assigned:', workerNames);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to assign workers');
      fetchRequests();
    }
  };

  // Toggle a worker in a request's pending selection
  const [pendingSelections, setPendingSelections] = useState({});

  const toggleWorkerSelection = (reqId, workerName, maxWorkers) => {
    setPendingSelections(prev => {
      const current = prev[reqId] || [];
      if (current.includes(workerName)) {
        return { ...prev, [reqId]: current.filter(n => n !== workerName) };
      }
      if (current.length >= maxWorkers) {
        alert(`Maximum ${maxWorkers} worker(s) allowed`);
        return prev;
      }
      return { ...prev, [reqId]: [...current, workerName] };
    });
  };

  const confirmAssignment = (reqId) => {
    const selected = pendingSelections[reqId] || [];
    if (!selected.length) return alert('Please select at least one worker');
    assignWorkers(reqId, selected);
    setPendingSelections(prev => { const copy = { ...prev }; delete copy[reqId]; return copy; });
  };

  const [workerForm, setWorkerForm] = useState({
    name: '',
    address: '',
    phone: '',
    skill: '',
    age: '',
    availability: 'Available'
  });

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'workers', label: 'Workers', icon: Users },
    { id: 'assign', label: 'Assign Job', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
  ];

  const handleAddWorker = async (e) => {
    e.preventDefault();
    if (!workerForm.name || !workerForm.skill || !workerForm.phone || !workerForm.address || !workerForm.age) {
      return alert('Please fill all fields');
    }

    try {
      const { data } = await api.post('/workers', workerForm);
      setWorkers([...workers, data]);
      setWorkerForm({
        name: '',
        address: '',
        phone: '',
        skill: '',
        age: '',
        availability: 'Available'
      });
      alert('Worker added successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add worker');
    }
  };

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [viewAssignedReq, setViewAssignedReq] = useState(null);

  const handleDeleteWorker = async (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      try {
        await api.delete(`/workers/${id}`);
        setWorkers(workers.filter(w => (w._id || w.id) !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete worker');
      }
    }
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
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-200 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] flex justify-between items-center gap-4 transition-all duration-300 hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)]">
                  <div>
                    <p className="text-xs uppercase text-gray-500 tracking-wide font-bold mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <span className="text-green-600 bg-green-100 text-xs px-2 py-1 rounded-full mt-2 inline-block font-bold">
                      +12.5%
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-tr from-pink-500 to-orange-400 shadow-lg shadow-orange-500/20">
                    <stat.icon size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* Analytics & Customers Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Performance Overview */}
              <div className="lg:col-span-2 bg-gray-200 rounded-2xl p-5 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.9),inset_6px_6px_12px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Performance Overview</h3>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">Weekly</button>
                    <button className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-700  rounded-full">Monthly</button>
                  </div>
                </div>

                <div className="flex items-end justify-between h-40 px-2 pb-1">
                  {[
                    { day: 'MON', height: 'h-16', color: 'bg-indigo-200' },
                    { day: 'TUE', height: 'h-24', color: 'bg-indigo-200' },
                    { day: 'WED', height: 'h-20', color: 'bg-indigo-200' },
                    { day: 'THU', height: 'h-32', color: 'bg-blue-500', active: true },
                    { day: 'FRI', height: 'h-16', color: 'bg-indigo-200' },
                    { day: 'SAT', height: 'h-28', color: 'bg-indigo-200' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 w-full">
                      <div
                        className={`w-10 ${item.height} ${item.color} rounded-t-xl transition-all duration-300`}
                      ></div>
                      <span className="text-[10px] font-bold uppercase text-gray-400">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Recent Customers & Weekly Goal */}
              <div className="flex flex-col gap-4">
                <div className="bg-gray-200 rounded-2xl p-5 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.9),inset_6px_6px_12px_rgba(0,0,0,0.1)]">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Recent Customers</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Jenkins', time: '2 min ago', amount: '+$240', color: 'from-pink-500 to-rose-500' },
                      { name: 'Michael Chen', time: '15 min ago', amount: '+$180', color: 'from-blue-500 to-cyan-500' },
                      { name: 'Emma Wilson', time: '1 hour ago', amount: '+$320', color: 'from-purple-500 to-indigo-500' }
                    ].map((customer, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${customer.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{customer.name}</p>
                            <p className="text-[9px] text-gray-500">{customer.time}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-green-600">{customer.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
                      View All Transactions
                    </button>
                  </div>
                </div>

                {/* Weekly Goal Card */}
                {/* <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-xl shadow-blue-500/20">
                  <h3 className="text-base font-bold mb-1">Weekly Goal</h3>
                  <p className="text-[10px] text-blue-100 mb-4">Target: 100 requests completed</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold">75%</span>
                      <span className="text-[9px] font-bold text-blue-100">75/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        );
      case 'requests':
        return (
          <div className="bg-gray-200 rounded-2xl shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(0,0,0,0.1)] p-4 transition-all duration-300 overflow-x-auto">
            {requests.length > 0 ? (
              <table className="w-full text-left border-separate border-spacing-y-2 table-fixed min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[17%]">Customer</th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[18%]">Service</th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[13%]">Date</th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[8%]">Workers</th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[13%]">Status</th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[14%]">Assigned</th>
                    <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[17%]">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {requests.map((req) => (
                    <tr key={req._id || req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <User size={16} className="text-gray-400 shrink-0" />
                          <p className="text-sm font-medium text-slate-900 truncate">{req.user?.name || "Unknown User"}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Wrench size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate">{req.serviceType}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-600 whitespace-nowrap">
                        {new Date(req.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-indigo-400 shrink-0" />
                          <span className="text-sm font-semibold text-slate-700">{req.workersRequired || 1}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={req.status}
                          disabled={req.status === 'Completed' || req.status === 'Cancelled'}
                          onChange={(e) => updateStatus(req._id || req.id, e.target.value)}
                          className={`bg-gray-50 shadow-sm rounded-lg text-[10px] font-bold px-2 py-1 outline-none ${(req.status === 'Completed' || req.status === 'Cancelled') ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 align-top">
                        {(req.assignedWorkers?.length > 0) ? (
                          <button
                            onClick={() => setViewAssignedReq(req)}
                            className="flex items-center gap-1 text-[10px] font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                          >
                            <Eye size={12} />
                            View ({req.assignedWorkers.length})
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400">None</span>
                        )}
                      </td>
                      <td className="px-3 py-2 align-top">
                        {(req.status !== 'Completed' && req.status !== 'Cancelled') ? (() => {
                          const reqId = req._id || req.id;
                          const isOpen = pendingSelections[reqId] !== undefined;
                          const selected = pendingSelections[reqId] || req.assignedWorkers || [];
                          return (
                            <div className="relative">
                              <button
                                onClick={() => {
                                  if (isOpen) {
                                    setPendingSelections(prev => { const c = { ...prev }; delete c[reqId]; return c; });
                                  } else {
                                    setPendingSelections(prev => ({ ...prev, [reqId]: [...(req.assignedWorkers || [])] }));
                                  }
                                }}
                                className="flex items-center gap-1 bg-gray-50 shadow-sm rounded-md text-[10px] font-bold px-2 py-[3px] text-slate-600 hover:bg-gray-100 transition-colors"
                              >
                                <Users size={10} className="text-indigo-400" />
                                {selected.length}/{req.workersRequired || 1}
                                <span className="text-[8px] text-slate-400">{isOpen ? '▲' : '▼'}</span>
                              </button>
                              {isOpen && (
                                <div className="absolute z-50 top-full left-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg p-1">
                                  <div className="max-h-28 overflow-y-auto">
                                    {workers.map(w => {
                                      const isChecked = selected.includes(w.name);
                                      return (
                                        <label key={w._id || w.id} className="flex items-center gap-1.5 cursor-pointer px-1.5 py-[3px] rounded hover:bg-slate-50 transition-colors">
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleWorkerSelection(reqId, w.name, req.workersRequired || 1)}
                                            className="accent-indigo-500 w-2.5 h-2.5"
                                          />
                                          <span className="text-[10px] text-slate-700 truncate leading-none">{w.name} <span className="text-slate-400">({w.skill})</span></span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                  <button
                                    onClick={() => confirmAssignment(reqId)}
                                    className="w-full mt-1 bg-indigo-500 text-white text-[9px] font-bold py-[3px] rounded-md hover:bg-indigo-600 transition-colors"
                                  >
                                    Confirm
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })() : (
                          <span className="text-[10px] text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-20 text-center">
                <p className="text-slate-500 font-medium text-sm">No service requests yet</p>
              </div>
            )}
          </div>
        );
      case 'workers':
        return (
          <div className="space-y-6">
            {/* Add Worker Form */}
            <div className="max-w-lg bg-gray-200 p-4 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] transition-all duration-300">
              <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-indigo-500">Add New Worker</h3>
              <form onSubmit={handleAddWorker} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 ml-1">Name</label>
                  <input
                    type="text"
                    value={workerForm.name}
                    onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 bg-gray-100 shadow-sm rounded-xl outline-none text-xs border border-transparent focus:border-indigo-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 ml-1">Skill</label>
                  <select
                    value={workerForm.skill}
                    onChange={(e) => setWorkerForm({ ...workerForm, skill: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-100 shadow-sm rounded-xl outline-none text-xs border border-transparent focus:border-indigo-500/30 transition-all"
                  >
                    <option value="">Select Skill</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Mechanic">Mechanic</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Cleaner">Cleaner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    value={workerForm.phone}
                    onChange={(e) => setWorkerForm({ ...workerForm, phone: e.target.value })}
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 bg-gray-100 shadow-sm rounded-xl outline-none text-xs border border-transparent focus:border-indigo-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 ml-1">Age</label>
                  <input
                    type="number"
                    value={workerForm.age}
                    onChange={(e) => setWorkerForm({ ...workerForm, age: e.target.value })}
                    placeholder="Age"
                    className="w-full px-3 py-2 bg-gray-100 shadow-sm rounded-xl outline-none text-xs border border-transparent focus:border-indigo-500/30 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 ml-1">Address</label>
                  <input
                    type="text"
                    value={workerForm.address}
                    onChange={(e) => setWorkerForm({ ...workerForm, address: e.target.value })}
                    placeholder="Worker Address"
                    className="w-full px-3 py-2 bg-gray-100 shadow-sm rounded-xl outline-none text-xs border border-transparent focus:border-indigo-500/30 transition-all"
                  />
                </div>
                <button type="submit" className="bg-indigo-500 text-white font-bold py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-xs h-[36px]">
                  Add Worker
                </button>
              </form>
            </div>

            {/* Workers List */}
            <div className="bg-gray-200 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] p-5 transition-all duration-300 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-800">Worker Directory</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filter:</span>
                  <select
                    value={workerFilter}
                    onChange={(e) => setWorkerFilter(e.target.value)}
                    className="px-3 py-1.5 bg-gray-100 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05)] rounded-lg outline-none text-[11px] text-slate-700 font-bold border border-transparent focus:border-indigo-500/30 transition-all cursor-pointer"
                  >
                    <option value="All">All Workers</option>
                    <option value="Electrician">Electricians</option>
                    <option value="Plumber">Plumbers</option>
                    <option value="Mechanic">Mechanics</option>
                    <option value="Carpenter">Carpenters</option>
                    <option value="Cleaner">Cleaners</option>
                  </select>
                </div>
              </div>
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Worker Name</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Skill</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Availability</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {(workerFilter === 'All' ? workers : workers.filter(w => w.skill === workerFilter)).map((worker) => (
                    <tr key={worker._id || worker.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {worker.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
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
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => setSelectedWorker(worker)}
                            className="p-2 bg-gray-200 text-indigo-500 rounded-xl shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-inner transition-all duration-200"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteWorker(worker._id || worker.id)}
                            className="p-2 bg-gray-200 text-red-500 rounded-xl shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] hover:shadow-inner transition-all duration-200"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
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
          <div className="max-w-xl bg-gray-200 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] transition-all duration-300">
            <h3 className="text-lg font-bold mb-6">Assign New Job</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Request</label>
                <select className="w-full p-3 bg-gray-50 shadow-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm">
                  <option>John Doe - Electrical (Pending)</option>
                  <option>Sarah Wilson - Painting (Pending)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">Select Worker</label>
                <select className="w-full p-3 bg-gray-50 shadow-sm rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm">
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
            <div className="bg-gray-200 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300">
              <p className="text-sm text-gray-500 font-medium mb-1">Total Earnings</p>
              <h3 className="text-2xl font-bold text-slate-900">$12,450.00</h3>
              <p className="text-xs text-green-500 mt-2 font-medium">↑ 12% from last month</p>
            </div>
            <div className="bg-gray-200 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300">
              <p className="text-sm text-gray-500 font-medium mb-1">Jobs Completed</p>
              <h3 className="text-2xl font-bold text-slate-900">842</h3>
              <p className="text-xs text-gray-500 mt-2 font-medium">Average 28 jobs / week</p>
            </div>
            <div className="bg-gray-200 p-5 rounded-2xl shadow-[-6px_-6px_12px_rgba(255,255,255,0.9),6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.8),4px_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300">
              <p className="text-sm text-gray-500 font-medium mb-1">Worker Performance</p>
              <h3 className="text-2xl font-bold text-slate-900">94%</h3>
              <p className="text-xs text-green-500 mt-2 font-medium">Customer satisfaction rate</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-200 text-slate-900 transition-all duration-300 font-sans">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 bg-gray-200 shadow-[4px_0_12px_rgba(0,0,0,0.05)] rounded-r-2xl p-6 flex-col shrink-0 transition-all duration-300">
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Local Service Agency" className="h-10 object-contain" />
            <span className="text-[10px] px-1.5 py-0.5 bg-indigo-500/10 text-indigo-500 rounded font-bold uppercase tracking-widest">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${activeTab === item.id
                ? 'bg-indigo-100 text-indigo-600 shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.7),inset_3px_3px_6px_rgba(0,0,0,0.1)]'
                : 'bg-gray-100 text-gray-700 hover:bg-white shadow-none'
                }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-indigo-600' : 'text-gray-500'} />
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
      <div className="md:hidden sticky top-0 z-50 bg-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between p-4 pb-2">
          <Link to="/" className="flex items-center gap-1">
            <img src={logo} alt="Local Service Agency" className="h-8 object-contain" />
            <span className="text-[10px] px-1 bg-indigo-500/10 text-indigo-500 rounded uppercase tracking-widest">Admin</span>
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
                : 'text-slate-500 bg-slate-100'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-200 transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto w-full flex flex-col h-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-500 transition-colors mb-6 group shrink-0"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
          <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Manage your agency operations and workers.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-tight">Admin User</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Manager</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                AD
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500 p-6">
            {renderContent()}
          </div>
        </div>

        {/* Worker Details Modal */}
        {selectedWorker && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-gray-200 w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button
                onClick={() => setSelectedWorker(null)}
                className="absolute top-5 right-5 p-1.5 bg-gray-200 text-gray-500 hover:text-red-500 rounded-xl shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] transition-all"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20 mb-3">
                  {selectedWorker.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{selectedWorker.name}</h2>
                <p className="text-indigo-500 font-bold text-xs uppercase tracking-widest mt-0.5">{selectedWorker.skill}</p>
              </div>

              <div className="space-y-2.5">
                <div className="bg-gray-200 p-3 rounded-2xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-bold uppercase text-gray-500 mb-0.5">Phone Number</p>
                  <p className="text-xs font-semibold text-gray-900">{selectedWorker.phone || "Not Provided"}</p>
                </div>
                <div className="bg-gray-200 p-3 rounded-2xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-bold uppercase text-gray-500 mb-0.5">Age</p>
                  <p className="text-xs font-semibold text-gray-900">{selectedWorker.age ? `${selectedWorker.age} years` : "Not Provided"}</p>
                </div>
                <div className="bg-gray-200 p-3 rounded-2xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-bold uppercase text-gray-500 mb-0.5">Address</p>
                  <p className="text-xs font-semibold text-gray-900 leading-relaxed">{selectedWorker.address || "Not Provided"}</p>
                </div>
                <div className="bg-gray-200 p-3 rounded-2xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-bold uppercase text-gray-500 mb-0.5">Current Status</p>
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${selectedWorker.availability === 'Available' ? 'text-green-500' : 'text-amber-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedWorker.availability === 'Available' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                    {selectedWorker.availability}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedWorker(null)}
                className="w-full mt-6 py-3 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] text-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

        {/* Assigned Workers View Modal */}
        {viewAssignedReq && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setViewAssignedReq(null)}>
            <div className="bg-gray-200 w-full max-w-xs rounded-[1.5rem] p-5 shadow-2xl relative animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setViewAssignedReq(null)}
                className="absolute top-4 right-4 p-1 bg-gray-200 text-gray-500 hover:text-red-500 rounded-lg shadow-[-2px_-2px_5px_rgba(255,255,255,0.8),2px_2px_5px_rgba(0,0,0,0.1)] transition-all"
              >
                <X size={14} />
              </button>

              <h3 className="text-sm font-bold text-gray-900 mb-1">Assigned Workers</h3>
              <p className="text-[10px] text-slate-400 mb-4">
                {viewAssignedReq.serviceType} • {viewAssignedReq.assignedWorkers?.length}/{viewAssignedReq.workersRequired || 1} assigned
              </p>

              <div className="space-y-2 max-h-52 overflow-y-auto">
                {viewAssignedReq.assignedWorkers?.map((name, i) => {
                  const workerInfo = workers.find(w => w.name === name);
                  return (
                    <div key={i} className="bg-gray-200 p-3 rounded-xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.1)] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md shadow-indigo-500/20">
                        {name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">{name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] text-indigo-500 font-bold uppercase">{workerInfo?.skill || '—'}</span>
                          {workerInfo?.phone && (
                            <>
                              <span className="text-[9px] text-slate-300">•</span>
                              <span className="text-[9px] text-slate-500">{workerInfo.phone}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setViewAssignedReq(null)}
                className="w-full mt-4 py-2 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-[0.98] text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
