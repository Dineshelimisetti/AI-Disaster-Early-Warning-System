import { useState, useEffect } from 'react';
import { usePredict } from '../hooks/usePredict';
import { useStates, useDistricts, useWeatherReport } from '../hooks/useWeather';
import PredictionCard from '../components/PredictionCard';
import { ExclamationTriangleIcon, ArrowPathIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useHistory } from '../hooks/useHistory';
import { useAuth } from '../contexts/AuthContext';

const Predictor = () => {
  const { prediction, loading: predicting, error: predictError, predict, reset } = usePredict();
  const { data: weatherData, loading: fetchingWeather, error: weatherError, fetchReport } = useWeatherReport();
  const { states } = useStates();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { districts } = useDistricts(selectedState);
  const [showAlert, setShowAlert] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const [formData, setFormData] = useState({ temperature: '', humidity: '', pressure: '', rainfall: '', windSpeed: '' });

  const { savePrediction } = useHistory();
  const { user } = useAuth();

  useEffect(() => { if (districts.length > 0 && !selectedDistrict) setSelectedDistrict(districts[0]); }, [districts]);
  const handleStateChange = (e) => { setSelectedState(e.target.value); setSelectedDistrict(''); setAutoFilled(false); };
  const handleDistrictChange = (e) => { setSelectedDistrict(e.target.value); setAutoFilled(false); };
  const handleFetchWeather = () => { if (selectedDistrict && selectedState) fetchReport(selectedDistrict, selectedState); };

  useEffect(() => {
    if (weatherData?.today && !autoFilled) {
      const t = weatherData.today;
      const filled = { temperature: String(t.temperature ?? t.tempMax ?? ''), humidity: String(t.humidity ?? ''), pressure: String(t.pressure ?? ''), rainfall: String(t.rainfall ?? ''), windSpeed: String(t.windSpeed ?? '') };
      setFormData(filled); setAutoFilled(true);
      predict({ temperature: parseFloat(filled.temperature) || 0, humidity: parseFloat(filled.humidity) || 0, pressure: parseFloat(filled.pressure) || 0, rainfall: parseFloat(filled.rainfall) || 0, windSpeed: parseFloat(filled.windSpeed) || 0, location: selectedDistrict || 'Unknown', state: selectedState || 'Unknown' })
        .then(r => { if (r?.severity?.toLowerCase() === 'high' || r?.severity?.toLowerCase() === 'critical') setShowAlert(true); });
    }
  }, [weatherData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some(v => v === '' || isNaN(v))) { alert('Fill all fields'); return; }
    const r = await predict({ temperature: +formData.temperature, humidity: +formData.humidity, pressure: +formData.pressure, rainfall: +formData.rainfall, windSpeed: +formData.windSpeed, location: selectedDistrict || 'Unknown', state: selectedState || 'Unknown' });
    if (r?.severity?.toLowerCase() === 'high' || r?.severity?.toLowerCase() === 'critical') setShowAlert(true);
  };

  useEffect(() => {
    if (!prediction || !user) return;
    savePrediction({
      location: selectedDistrict,
      state: selectedState,
      district: selectedDistrict,
      predictionData: prediction,
    }).catch(console.error);
  }, [prediction, user]);

  const handleReset = () => { setFormData({ temperature: '', humidity: '', pressure: '', rainfall: '', windSpeed: '' }); reset(); setShowAlert(false); setAutoFilled(false); };

  const fields = [
    { name: 'temperature', label: 'Temperature (°C)', ph: '28.5' },
    { name: 'humidity', label: 'Humidity (%)', ph: '65' },
    { name: 'pressure', label: 'Pressure (hPa)', ph: '1013' },
    { name: 'rainfall', label: 'Rainfall (mm)', ph: '25' },
    { name: 'windSpeed', label: 'Wind Speed (km/h)', ph: '15' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {showAlert && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white p-12 rounded-[48px] max-w-md w-full animate-scale-in text-center shadow-2xl border border-red-100">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-red-50 text-red-600">
              <ExclamationTriangleIcon className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-black font-display text-gray-900 mb-4 tracking-tight uppercase">High Risk Event</h3>
            <p className="text-lg font-medium mb-10 text-gray-500 leading-relaxed">Our AI models have detected a high probability of a severe weather event in this zone.</p>
            <button onClick={() => setShowAlert(false)} className="w-full btn-danger py-4 rounded-2xl font-black uppercase tracking-widest text-sm">Acknowledge Alert</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-30 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

            <h3 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em] mb-8 relative z-10">Analysis Parameters</h3>

            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">State</label>
                <select value={selectedState} onChange={handleStateChange} className="select-dark py-2.5 text-xs"><option value="">Select</option>{states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}</select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">District</label>
                <select value={selectedDistrict} onChange={handleDistrictChange} className="select-dark py-2.5 text-xs"><option value="">Select</option>{districts.map(d => <option key={d} value={d}>{d}</option>)}</select>
              </div>
            </div>

            <button onClick={handleFetchWeather} disabled={fetchingWeather || !selectedDistrict}
              className={`w-full mb-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all border ${autoFilled ? 'text-emerald-500 bg-emerald-50 border-emerald-100 shadow-lg shadow-emerald-500/10' : 'btn-accent shadow-orange-100'}`}>
              {fetchingWeather ? <ArrowPathIcon className="h-4 w-4 animate-spin mx-auto" /> : autoFilled ? 'Telemetry Synced' : 'Sync Regional Telemetry'}
            </button>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {fields.map(f => (
                <div key={f.name} className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{f.label}</label>
                  <input type="number" name={f.name} value={formData[f.name]} onChange={handleChange} step="0.1" placeholder={f.ph} required className="input-dark py-3.5 focus:bg-white" />
                </div>
              ))}
              <div className="flex gap-4 pt-6">
                <button type="submit" disabled={predicting} className="btn-accent flex-1 py-4 text-xs font-black uppercase tracking-widest shadow-orange-100">
                  {predicting ? <ArrowPathIcon className="h-5 w-5 animate-spin mx-auto" /> : 'Run Prediction'}
                </button>
                <button type="button" onClick={handleReset} className="px-6 rounded-2xl bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors">
                  <ArrowPathIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8">
          {!prediction && !predicting ? (
            <div className="h-full min-h-[600px] rounded-[48px] bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center p-12 space-y-8 group">
              <div className="w-32 h-32 rounded-[40px] bg-orange-50 flex items-center justify-center text-orange-600 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
                <BeakerIcon className="h-16 w-16" strokeWidth={1} />
              </div>
              <div className="max-w-md space-y-4">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">Ready for Simulation</p>
                <h3 className="text-4xl font-black text-gray-900 font-display tracking-tight">AI Lab Environment</h3>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">Enter atmospheric conditions or sync regional telemetry to initialize our predictive disaster algorithms.</p>
              </div>
            </div>
          ) : (
            <PredictionCard prediction={prediction} loading={predicting} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictor;
