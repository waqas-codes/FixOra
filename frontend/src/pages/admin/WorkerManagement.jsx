import { useState, useEffect } from 'react';
import API from '../../utils/api';
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiX,
  FiPhone,
  FiMail,
  FiUser,
} from 'react-icons/fi';

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    hourlyRate: '',
    status: 'available',
  });

  const fetchWorkers = async () => {
    try {
      const { data } = await API.get('/workers');
      setWorkers(data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      hourlyRate: '',
      status: 'available',
    });
    setEditingWorker(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (worker) => {
    setEditingWorker(worker);
    setForm({
      name: worker.name,
      email: worker.email || '',
      phone: worker.phone,
      specialization: worker.specialization,
      hourlyRate: worker.hourlyRate || '',
      status: worker.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingWorker) {
        await API.put(`/workers/${editingWorker._id}`, form);
      } else {
        await API.post('/workers', form);
      }
      setShowModal(false);
      resetForm();
      fetchWorkers();
    } catch (error) {
      console.error('Error saving worker:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this worker?')) return;
    try {
      await API.delete(`/workers/${id}`);
      fetchWorkers();
    } catch (error) {
      console.error('Error deleting worker:', error);
    }
  };

  const statusColor = {
    available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    busy: 'bg-amber-50 text-amber-700 border-amber-200',
    'off-duty': 'bg-gray-100 text-gray-600 border-gray-200',
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workers</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your agency workers
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
        >
          <FiPlus size={18} />
          Add Worker
        </button>
      </div>

      {/* Workers Grid */}
      {workers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FiUser size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No workers yet
          </h3>
          <p className="text-gray-400 text-sm">
            Add your first worker to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {workers.map((worker) => (
            <div
              key={worker._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                    {worker.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {worker.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {worker.specialization}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${statusColor[worker.status]}`}
                >
                  {worker.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {worker.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiPhone size={14} />
                    {worker.phone}
                  </div>
                )}
                {worker.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiMail size={14} />
                    {worker.email}
                  </div>
                )}
                {worker.hourlyRate > 0 && (
                  <p className="text-sm text-gray-500">
                    💰 ${worker.hourlyRate}/hr
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openEdit(worker)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <FiEdit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(worker._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900">
                {editingWorker ? 'Edit Worker' : 'Add Worker'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  placeholder="Worker name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  placeholder="worker@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialization *
                </label>
                <select
                  value={form.specialization}
                  onChange={(e) =>
                    setForm({ ...form, specialization: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  required
                >
                  <option value="">Select specialization</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Cleaning</option>
                  <option>Painting</option>
                  <option>Carpentry</option>
                  <option>HVAC</option>
                  <option>Landscaping</option>
                  <option>General Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={form.hourlyRate}
                  onChange={(e) =>
                    setForm({ ...form, hourlyRate: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  placeholder="25"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="off-duty">Off Duty</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-500/25 mt-2"
              >
                {editingWorker ? 'Update Worker' : 'Add Worker'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerManagement;
