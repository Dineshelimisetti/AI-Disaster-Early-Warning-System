import { useState } from 'react';
import { predictDisaster } from '../services/api';

export const usePredict = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async (weatherData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await predictDisaster(weatherData);
      if (result.success) {
        setPrediction(result.data);
        return result.data;
      } else {
        setError(result.error || 'Prediction failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to predict disaster');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPrediction(null);
    setError(null);
  };

  return { prediction, loading, error, predict, reset };
};

export default usePredict;
