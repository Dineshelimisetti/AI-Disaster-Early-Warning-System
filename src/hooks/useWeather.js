import { useState, useEffect } from 'react';
import { getWeatherReport, getStates as fetchStatesApi, getDistricts as fetchDistrictsApi } from '../services/api';

const reportCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export const useWeatherReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async (location, state) => {
    if (!location || !state) return;

    const cacheKey = `${location.toLowerCase()}_${state.toLowerCase()}`;
    const cached = reportCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setData(cached.data);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getWeatherReport(location, state);
      if (result.success) {
        reportCache.set(cacheKey, { data: result.data, timestamp: Date.now() });
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch weather report');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch weather report');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchReport };
};

export const useStates = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchStatesApi();
        if (result.success) {
          setStates(result.states);
        }
      } catch (err) {
        console.error('Failed to load states:', err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { states, loading };
};

export const useDistricts = (stateName) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stateName) {
      setDistricts([]);
      return;
    }
    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchDistrictsApi(stateName);
        if (result.success) {
          setDistricts(result.districts);
        }
      } catch (err) {
        console.error('Failed to load districts:', err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [stateName]);

  return { districts, loading };
};

export default useWeatherReport;
