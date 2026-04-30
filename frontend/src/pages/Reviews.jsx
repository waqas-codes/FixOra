import { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const Reviews = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    avgRating: 0,
    totalReviews: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/reviews');
      setReviews(data);

      // Calculate stats
      if (data.length > 0) {
        const avg = (data.reduce((acc, r) => acc + r.rating, 0) / data.length).toFixed(1);
        const now = new Date();
        const thisMonthCount = data.filter((r) => {
          const reviewDate = new Date(r.createdAt);
          return (
            reviewDate.getMonth() === now.getMonth() &&
            reviewDate.getFullYear() === now.getFullYear()
          );
        }).length;

        setStats({
          avgRating: avg,
          totalReviews: data.length,
          thisMonth: thisMonthCount,
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const StarRating = ({ rating, size = 14 }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-slate-200'
          }
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {isAdmin ? 'Reviews & Feedback' : 'My Reviews'}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {isAdmin
            ? "What your customers are saying about FixOra services"
            : 'Reviews you have submitted for completed services'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Avg Rating',
            value: stats.avgRating || '0.0',
            icon: <Star className="text-amber-400 fill-amber-400" size={20} />,
          },
          {
            label: 'Total Reviews',
            value: stats.totalReviews,
            icon: <MessageSquare className="text-blue-500" size={20} />,
          },
          {
            label: 'New This Month',
            value: stats.thisMonth,
            icon: <Calendar className="text-indigo-500" size={20} />,
          },
          {
            label: isAdmin ? 'Customers' : 'Services',
            value: isAdmin
              ? new Set(reviews.map((r) => r.customer?._id)).size
              : new Set(reviews.map((r) => r.request?.serviceType)).size,
            icon: <User className="text-emerald-500" size={20} />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-50 rounded-xl">{stat.icon}</div>
              <span className="text-sm font-medium text-slate-500">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 leading-none">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {reviews.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              No reviews yet
            </h3>
            <p className="text-sm text-slate-400">
              {isAdmin
                ? 'Reviews will appear here once customers complete services'
                : 'Complete a service request and leave a review'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-6 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {isAdmin
                        ? review.customer?.name?.charAt(0).toUpperCase()
                        : review.request?.serviceType?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {isAdmin
                          ? review.customer?.name
                          : review.request?.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {formatDate(review.createdAt)} •{' '}
                        {isAdmin
                          ? review.request?.serviceType
                          : review.request?.title}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
