import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getWeatherReport = async (location, state) => {
  const response = await api.get('/api/weather/report', {
    params: { location, state },
  });
  return response.data;
};

export const getStates = async () => {
  const response = await api.get('/api/weather/states');
  return response.data;
};

export const getDistricts = async (state) => {
  const response = await api.get(`/api/weather/states/${encodeURIComponent(state)}/districts`);
  return response.data;
};

export const getIndiaOverview = async () => {
  const response = await api.get('/api/weather/india-overview');
  return response.data;
};

export const predictDisaster = async (data) => {
  const response = await api.post('/api/weather/predict', data);
  return response.data;
};

export const downloadPdfReport = async (location, state) => {
  const response = await api.get('/api/weather/report/pdf', {
    params: { location, state },
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = `Weather_Report_${location}_${new Date().toISOString().split('T')[0]}.pdf`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export default api;
