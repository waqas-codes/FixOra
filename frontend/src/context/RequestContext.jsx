import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const RequestContext = createContext();

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch requests for the current logged-in user
  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/requests/my');
      setRequests(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch requests');
      console.error('Fetch requests error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all requests (for Admin)
  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/requests');
      setRequests(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch all requests');
      console.error('Fetch all requests error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new service request
  const addRequest = async (requestData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/requests', requestData);
      setRequests((prev) => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to submit request';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Update request status (Admin)
  const updateRequestStatus = async (id, status) => {
    try {
      await api.put(`/requests/${id}/status`, { status });
      setRequests((prev) =>
        prev.map((req) => (req._id === id || req.id === id ? { ...req, status } : req))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to update status' };
    }
  };

  // Assign worker to request (Admin)
  const assignWorker = async (id, workerName) => {
    try {
      await api.put(`/requests/${id}/assign`, { workerName });
      setRequests((prev) =>
        prev.map((req) => (req._id === id || req.id === id ? { ...req, assignedWorker: workerName } : req))
      );
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to assign worker' };
    }
  };

  const value = {
    requests,
    loading,
    error,
    fetchUserRequests,
    fetchAllRequests,
    addRequest,
    updateRequestStatus,
    assignWorker,
  };

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
};
