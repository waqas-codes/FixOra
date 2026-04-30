import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiPlusCircle,
} from 'react-icons/fi';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, reqRes] = await Promise.all([
          API.get('/service-requests/stats'),
          API.get('/service-requests'),
        ]);
        setStats(statsRes.data);
        setRecentRequests(reqRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Requests',
      value: stats?.total || 0,
      icon: <FiFileText size={22} />,
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      label: 'Pending',
      value: stats?.pending || 0,
      icon: <FiClock size={22} />,
      color: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/20',
    },
    {
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: <FiTrendingUp size={22} />,
      color: 'from-indigo-500 to-purple-500',
      shadow: 'shadow-indigo-500/20',
    },
    {
      label: 'Completed',
      value: stats?.completed || 0,
      icon: <FiCheckCircle size={22} />,
      color: 'from-emerald-500 to-green-500',
      shadow: 'shadow-emerald-500/20',
    },
  ];

  const statusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      approved: 'bg-blue-50 text-blue-700 border-blue-200',
      'in-progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    return (
      <span
        className={`px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Hi, {user?.name}! 👋</h2>
            <p className="text-blue-100 mt-1">
              Track your service requests and submit new ones.
            </p>
          </div>
          <Link
            to="/customer/new-request"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium text-sm hover:bg-white/30 transition-all border border-white/20"
          >
            <FiPlusCircle size={18} />
            New Request
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md ${card.shadow} transition-all duration-300 border border-gray-100`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {card.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-md ${card.shadow}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Requests</h3>
          <Link
            to="/customer/requests"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </Link>
        </div>
        {recentRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <FiFileText size={40} className="mx-auto mb-3 opacity-50" />
            <p>You haven&apos;t made any requests yet</p>
            <Link
              to="/customer/new-request"
              className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-2 hover:text-blue-700"
            >
              <FiPlusCircle size={14} />
              Create your first request
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="px-6 py-4 hover:bg-gray-50/50 transition-colors flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {req.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {req.serviceType} •{' '}
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {statusBadge(req.status)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
