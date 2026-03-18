import { useState } from 'react';
import api from '../services/api';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveWeatherReport = async (reportData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/history/save-report', reportData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save report');
      console.error('Error saving report:', err);
    } finally {
      setLoading(false);
    }
  };

  const savePrediction = async (predictionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/history/save-prediction', predictionData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save prediction');
      console.error('Error saving prediction:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (type = null, limit = 50, skip = 0) => {
    setLoading(true);
    setError(null);
    try {
      const params = { limit, skip };
      if (type) params.type = type;
      const response = await api.get('/api/history', { params });
      setHistory(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/history/stats');
      setStats(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationHistory = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/history/location/${location}`);
      setHistory(response.data.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch location history');
      console.error('Error fetching location history:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/api/history/${id}`);
      setHistory(history.filter(item => item._id !== id));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete history');
      console.error('Error deleting history:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearAllHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete('/api/history');
      setHistory([]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear history');
      console.error('Error clearing history:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    history,
    stats,
    loading,
    error,
    saveWeatherReport,
    savePrediction,
    fetchHistory,
    fetchStats,
    fetchLocationHistory,
    deleteHistory,
    clearAllHistory,
  };
};
