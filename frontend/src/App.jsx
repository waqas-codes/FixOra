import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import WorkerManagement from './pages/admin/WorkerManagement';
import AdminServiceRequests from './pages/admin/AdminServiceRequests';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyRequests from './pages/customer/MyRequests';
import NewRequest from './pages/customer/NewRequest';

// Common Pages
import Services from './pages/Services';
import Reviews from './pages/Reviews';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent shadow-xl shadow-blue-500/10"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace />} 
        />
        <Route 
          path="/register" 
          element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace />} 
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout title="Admin Portal" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="workers" element={<WorkerManagement />} />
          <Route path="requests" element={<AdminServiceRequests />} />
          <Route path="services" element={<Services />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute requiredRole="customer">
              <DashboardLayout title="Customer Portal" />
            </ProtectedRoute>
          }
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="new-request" element={<NewRequest />} />
          <Route path="services" element={<Services />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
