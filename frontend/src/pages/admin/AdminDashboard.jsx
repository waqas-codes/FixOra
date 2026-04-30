import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  ClipboardList,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Calendar,
  ArrowRight,
  Plus,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [workerCount, setWorkerCount] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, workersRes, requestsRes] = await Promise.all([
          API.get('/service-requests/stats'),
          API.get('/workers'),
          API.get('/service-requests'),
        ]);
        setStats(statsRes.data);
        setWorkerCount(workersRes.data.length);
        setRecentRequests(requestsRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-[3px] border-slate-200 border-t-blue-600 animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-400 font-semibold text-xs uppercase tracking-widest">Loading dashboard</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Requests', value: stats?.total || 0, icon: ClipboardList, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600', trend: '+12%', trendUp: true },
    { label: 'Pending', value: stats?.pending || 0, icon: Clock, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600', trend: '5 today', trendUp: false },
    { label: 'In Progress', value: stats?.inProgress || 0, icon: TrendingUp, gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-600', trend: '+2.4%', trendUp: true },
    { label: 'Completed', value: stats?.completed || 0, icon: CheckCircle2, gradient: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-600', trend: '84% rate', trendUp: true },
    { label: 'Total Workers', value: workerCount, icon: Users, gradient: 'from-cyan-500 to-teal-600', bg: 'bg-cyan-50', text: 'text-cyan-600', trend: 'Active', trendUp: true },
    { label: 'Cancelled', value: stats?.cancelled || 0, icon: AlertCircle, gradient: 'from-rose-500 to-red-600', bg: 'bg-rose-50', text: 'text-rose-600', trend: '-4%', trendUp: false },
  ];

  const statusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 ring-amber-500/20',
      approved: 'bg-blue-50 text-blue-700 ring-blue-500/20',
      'in-progress': 'bg-violet-50 text-violet-700 ring-violet-500/20',
      completed: 'bg-emerald-50 text-emerald-700 ring-emerald-500/20',
      cancelled: 'bg-rose-50 text-rose-700 ring-rose-500/20',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
        <div>
          <p className="text-sm font-semibold text-blue-600 mb-1">Dashboard Overview</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Here's what's happening with FixOra today.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Calendar size={16} />
            <span>Schedule</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 rounded-xl text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-[0.97]">
            <Plus size={16} />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div
            key={card.label}
            className={`bg-white rounded-2xl p-5 border border-slate-100 card-hover animate-fade-in-up stagger-${i + 1} group relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                <card.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${card.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                {card.trend}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{card.label}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden animate-fade-in-up">
          <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recent Requests</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Latest service activity</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {recentRequests.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ClipboardList size={24} className="text-slate-300" />
                </div>
                <p className="text-slate-400 font-semibold text-sm">No service requests yet</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-50">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentRequests.map((req) => (
                    <tr key={req._id} className="group hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{req.title}</span>
                        <span className="block text-xs text-slate-400 font-medium">{req.serviceType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                            {req.customer?.name?.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-slate-600">{req.customer?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{statusBadge(req.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xs font-semibold text-slate-400">
                          {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="px-6 py-3.5 bg-slate-50/40 border-t border-slate-100 text-center">
             <button className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:text-blue-700 transition-colors">
               View All Activity →
             </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5 animate-fade-in-up stagger-4">
          {/* Active Workers */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-5">
                 <Activity size={16} className="text-blue-400" />
                 <h4 className="text-sm font-extrabold tracking-tight">Active Workers</h4>
               </div>
               
               <div className="space-y-3">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs">
                         {['JS', 'MK', 'AL'][i-1]}
                       </div>
                       <div>
                         <p className="text-sm font-semibold leading-none">{['John Smith', 'Mike Ross', 'Ana Lee'][i-1]}</p>
                         <p className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                           Online
                         </p>
                       </div>
                     </div>
                     <ArrowRight size={14} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                   </div>
                 ))}
               </div>

               <button className="w-full mt-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider transition-all border border-white/5">
                  Manage Team
               </button>
             </div>
             <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all duration-700" />
          </div>

          {/* Insight Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden group">
             <div className="relative z-10">
               <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <TrendingUp size={18} />
               </div>
               <h4 className="text-sm font-extrabold tracking-tight mb-2">Agency Insight</h4>
               <p className="text-blue-100 text-sm font-medium leading-relaxed">
                 Your response time has improved by 15% this week. Keep it up!
               </p>
             </div>
             <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
