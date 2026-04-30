import { useState, useEffect } from 'react';
import API from '../../utils/api';
import { FiFileText, FiUserCheck, FiX } from 'react-icons/fi';

const AdminServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchData = async () => {
    try {
      const [reqRes, workerRes] = await Promise.all([
        API.get('/service-requests'),
        API.get('/workers'),
      ]);
      setRequests(reqRes.data);
      setWorkers(workerRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/service-requests/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const assignWorker = async (requestId, workerId) => {
    try {
      await API.put(`/service-requests/${requestId}`, {
        assignedWorker: workerId,
        status: 'approved',
      });
      setAssignModal(null);
      fetchData();
    } catch (error) {
      console.error('Error assigning worker:', error);
    }
  };

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

  const priorityBadge = (priority) => {
    const styles = {
      low: 'bg-gray-100 text-gray-600',
      medium: 'bg-blue-50 text-blue-600',
      high: 'bg-orange-50 text-orange-600',
      urgent: 'bg-red-50 text-red-600',
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${styles[priority]}`}
      >
        {priority}
      </span>
    );
  };

  const filtered =
    filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and assign customer service requests
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'approved', 'in-progress', 'completed', 'cancelled'].map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && ` (${requests.length})`}
            </button>
          )
        )}
      </div>

      {/* Request Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FiFileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">
            No requests found
          </h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {req.title}
                    </h3>
                    {priorityBadge(req.priority)}
                    {statusBadge(req.status)}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                    {req.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span>📋 {req.serviceType}</span>
                    <span>👤 {req.customer?.name}</span>
                    {req.assignedWorker && (
                      <span>🔧 {req.assignedWorker?.name}</span>
                    )}
                    <span>
                      📅 {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {req.status === 'pending' && (
                    <button
                      onClick={() => setAssignModal(req)}
                      className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1"
                    >
                      <FiUserCheck size={14} />
                      Assign
                    </button>
                  )}
                  {(req.status === 'approved' ||
                    req.status === 'pending') && (
                    <button
                      onClick={() => updateStatus(req._id, 'in-progress')}
                      className="px-3 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                    >
                      Start
                    </button>
                  )}
                  {req.status === 'in-progress' && (
                    <button
                      onClick={() => updateStatus(req._id, 'completed')}
                      className="px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors"
                    >
                      Complete
                    </button>
                  )}
                  {req.status !== 'completed' &&
                    req.status !== 'cancelled' && (
                      <button
                        onClick={() => updateStatus(req._id, 'cancelled')}
                        className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assign Worker Modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setAssignModal(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                Assign Worker
              </h3>
              <button
                onClick={() => setAssignModal(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Assign a worker to &quot;{assignModal.title}&quot;
            </p>
            {workers.filter((w) => w.status === 'available').length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                No available workers
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {workers
                  .filter((w) => w.status === 'available')
                  .map((worker) => (
                    <button
                      key={worker._id}
                      onClick={() => assignWorker(assignModal._id, worker._id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {worker.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {worker.specialization}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServiceRequests;
