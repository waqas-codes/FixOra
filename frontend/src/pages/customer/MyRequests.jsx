import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { FiFileText, FiPlusCircle, FiTrash2, FiStar, FiX } from 'react-icons/fi';
import { Star } from 'lucide-react';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [reviewedRequests, setReviewedRequests] = useState(new Set());

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const fetchRequests = async () => {
    try {
      const { data } = await API.get('/service-requests');
      setRequests(data);

      // Check review status for completed requests
      const completedRequests = data.filter((r) => r.status === 'completed');
      const reviewedSet = new Set();

      await Promise.all(
        completedRequests.map(async (req) => {
          try {
            const { data: reviewData } = await API.get(`/reviews/check/${req._id}`);
            if (reviewData.hasReview) {
              reviewedSet.add(req._id);
            }
          } catch (err) {
            console.error('Error checking review status:', err);
          }
        })
      );

      setReviewedRequests(reviewedSet);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const cancelRequest = async (id) => {
    if (!window.confirm('Cancel this service request?')) return;
    try {
      await API.put(`/service-requests/${id}`, { status: 'cancelled' });
      fetchRequests();
    } catch (error) {
      console.error('Error cancelling request:', error);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm('Delete this service request?')) return;
    try {
      await API.delete(`/service-requests/${id}`);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  // Review functions
  const openReviewModal = (request) => {
    setSelectedRequest(request);
    setReviewForm({ rating: 0, comment: '' });
    setHoverRating(0);
    setReviewError('');
    setReviewSuccess('');
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedRequest(null);
    setReviewForm({ rating: 0, comment: '' });
    setHoverRating(0);
    setReviewError('');
    setReviewSuccess('');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');

    if (reviewForm.rating === 0) {
      setReviewError('Please select a star rating');
      return;
    }
    if (reviewForm.comment.trim().length < 5) {
      setReviewError('Comment must be at least 5 characters');
      return;
    }

    setSubmittingReview(true);
    try {
      await API.post('/reviews', {
        requestId: selectedRequest._id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviewSuccess('Review submitted successfully!');
      setReviewedRequests((prev) => new Set([...prev, selectedRequest._id]));
      setTimeout(() => {
        closeReviewModal();
      }, 1500);
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Requests</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track all your service requests
          </p>
        </div>
        <Link
          to="/customer/new-request"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
        >
          <FiPlusCircle size={18} />
          New Request
        </Link>
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
              {f === 'all' ? `All (${requests.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Requests */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FiFileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No requests found
          </h3>
          <Link
            to="/customer/new-request"
            className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-2"
          >
            <FiPlusCircle size={14} />
            Create a request
          </Link>
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
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {req.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span>📋 {req.serviceType}</span>
                    {req.assignedWorker && (
                      <span>🔧 Worker: {req.assignedWorker?.name}</span>
                    )}
                    {req.address && <span>📍 {req.address}</span>}
                    <span>
                      📅 {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {req.status === 'pending' && (
                    <button
                      onClick={() => cancelRequest(req._id)}
                      className="px-3 py-2 text-xs font-medium text-amber-600 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  {req.status === 'completed' && (
                    <>
                      {reviewedRequests.has(req._id) ? (
                        <span className="px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-xl flex items-center gap-1">
                          <FiStar size={14} />
                          Reviewed
                        </span>
                      ) : (
                        <button
                          onClick={() => openReviewModal(req)}
                          className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          <FiStar size={14} />
                          Add Review
                        </button>
                      )}
                    </>
                  )}
                  {(req.status === 'completed' ||
                    req.status === 'cancelled') && (
                    <button
                      onClick={() => deleteRequest(req._id)}
                      className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-1"
                    >
                      <FiTrash2 size={14} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeReviewModal}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900">Add Review</h3>
              <button
                onClick={closeReviewModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mb-5 p-3 bg-blue-50 rounded-xl">
              <p className="text-sm font-medium text-blue-900">
                {selectedRequest.title}
              </p>
              <p className="text-xs text-blue-600 mt-0.5">
                {selectedRequest.serviceType}
              </p>
            </div>

            {reviewError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {reviewError}
              </div>
            )}

            {reviewSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-sm">
                {reviewSuccess}
              </div>
            )}

            <form onSubmit={submitReview} className="space-y-5">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Rating *
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: star })
                      }
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={
                          star <= (hoverRating || reviewForm.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200'
                        }
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {reviewForm.rating > 0
                    ? ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][
                        reviewForm.rating - 1
                      ]
                    : 'Click to rate'}
                </p>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Comment *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  placeholder="Share your experience with this service..."
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
                  rows={4}
                  required
                  minLength={5}
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {reviewForm.comment.length}/500
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submittingReview}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-blue-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submittingReview ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiStar size={18} />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
