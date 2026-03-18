import { useState, useEffect } from 'react';
import { useWeatherReport, useStates, useDistricts } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import GraphCard from '../components/GraphCard';
import { ExclamationTriangleIcon, CheckCircleIcon, ArrowPathIcon, MagnifyingGlassIcon, CloudIcon, SunIcon, BoltIcon, BeakerIcon, SparklesIcon, MapIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { downloadPdfReport } from '../services/api';

const Dashboard = () => {
  const { data, loading, error, fetchReport } = useWeatherReport();
  const { states } = useStates();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { districts } = useDistricts(selectedState);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => { if (districts.length > 0 && !selectedDistrict) setSelectedDistrict(districts[0]); }, [districts]);

  const handleSearch = () => { if (selectedDistrict && selectedState) fetchReport(selectedDistrict, selectedState); };

  const handlePdf = async () => {
    if (!selectedDistrict || !selectedState) return;
    setDownloading(true);
    try {
      await downloadPdfReport(selectedDistrict, selectedState);
    } catch (err) {
      console.error('PDF Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const today = data?.today;
  const risk = data?.disasterAssessment;

  const buildForecastChart = () => {
    if (!data?.upcoming7Days) return null;
    return {
      labels: data.upcoming7Days.map(d => new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })),
      datasets: [
        { label: 'Max °C', data: data.upcoming7Days.map(d => d.tempMax), borderColor: '#ea580c', backgroundColor: 'rgba(234,88,12,0.05)', fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4, pointBackgroundColor: '#fff', pointBorderWidth: 2 },
        { label: 'Min °C', data: data.upcoming7Days.map(d => d.tempMin), borderColor: '#94a3b8', backgroundColor: 'transparent', fill: false, tension: 0.4, borderWidth: 2, borderDash: [5, 5], pointRadius: 0 },
      ],
    };
  };

  const buildRainfallChart = () => {
    if (!data?.upcoming7Days) return null;
    return {
      labels: data.upcoming7Days.map(d => new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })),
      datasets: [{ label: 'Rainfall (mm)', data: data.upcoming7Days.map(d => d.rainfall), backgroundColor: 'rgba(234,88,12,0.2)', borderColor: '#ea580c', borderWidth: 2, borderRadius: 8, barThickness: 20 }],
    };
  };

  const getIcon = (c) => {
    const s = (c || '').toLowerCase();
    if (s.includes('thunder')) return <BoltIcon className="h-6 w-6 text-orange-500" />;
    if (s.includes('rain')) return <CloudIcon className="h-6 w-6 text-blue-500" />;
    if (s.includes('cloud')) return <CloudIcon className="h-6 w-6 text-gray-400" />;
    if (s.includes('haze') || s.includes('fog')) return <BeakerIcon className="h-6 w-6 text-gray-300" />;
    return <SunIcon className="h-6 w-6 text-amber-500" />;
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header Controls - Premium Glassmorphism */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em]">Operational Area</h2>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-400">Select State Territory</label>
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }} className="select-dark py-3">
                <option value="">Choose State</option>
                {states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-400">Target District</label>
              <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="select-dark py-3">
                <option value="">Choose District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="lg:col-span-4">
            <button onClick={handleSearch} disabled={loading || !selectedDistrict} className="w-full btn-accent py-4 text-base shadow-orange-200">
              {loading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <><MagnifyingGlassIcon className="h-5 w-5" />Initialize Analysis</>}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-6 rounded-3xl border border-red-100 bg-red-50/50 flex items-center gap-4 text-red-800 font-bold">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          {error}
        </div>
      )}

      {loading && (
        <div className="p-32 flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 rounded-full animate-spin border-gray-100 border-t-orange-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-xl font-black text-gray-900 font-display uppercase tracking-widest text-center">Analyzing...</p>
            <p className="text-sm font-bold text-gray-400">Synthesizing real-time satellite telemetry...</p>
          </div>
        </div>
      )}

      {!loading && !data && !error && (
        <div className="p-32 rounded-[40px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-24 h-24 rounded-[32px] bg-orange-50 flex items-center justify-center text-orange-600">
            <CloudIcon className="h-12 w-12" strokeWidth={1.5} />
          </div>
          <div className="max-w-md space-y-4">
            <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight">System Ready</h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">Please select a location above to initialize the weather intelligence engine.</p>
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="space-y-8 animate-in fade-in duration-700">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <WeatherCard data={today} />

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: 'Feels Like', value: `${today?.feelsLike ?? '--'}°`, icon: SunIcon, color: 'text-orange-500' },
                { label: 'UV Index', value: today?.uvIndex ?? '--', icon: SparklesIcon, color: 'text-amber-500' },
                { label: 'Visibility', value: `${today?.visibility ?? '--'} km`, icon: MapIcon, color: 'text-blue-500' },
                { label: 'Air Quality', value: today?.airQuality ?? '--', icon: CloudIcon, color: 'text-emerald-500' },
                { label: 'Dew Point', value: `${today?.dewPoint ?? '--'}°C`, icon: BeakerIcon, color: 'text-cyan-500' },
                { label: 'Risk Profile', value: risk?.riskLevel || 'Stable', isRisk: true },
              ].map((s, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-500 group">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">{s.label}</p>
                    {!s.isRisk && s.icon && <s.icon className={`h-4 w-4 ${s.color} opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all`} />}
                  </div>
                  {s.isRisk ? (
                    <div className="mt-2 text-xl font-black">
                      <span className={`px-4 py-1.5 rounded-xl text-xs uppercase tracking-widest font-black ${(risk?.riskLevel || 'none').toLowerCase()} bg-opacity-10`}>
                        {risk?.riskLevel || 'Clear'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-gray-900 font-display">{s.value}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alert Banners */}
          {risk?.hasDisasterRisk ? (
            <div className="p-10 rounded-[40px] bg-red-600 text-white shadow-2xl shadow-red-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start lg:items-center">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                  <ExclamationTriangleIcon className="h-10 w-10" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-black font-display tracking-tight uppercase">Critical Risk Detected</h3>
                    <div className="px-3 py-1 bg-white text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Active Threat</div>
                  </div>
                  <p className="text-xl text-white/80 font-medium leading-relaxed max-w-4xl">{risk.safetyWarning}</p>
                </div>
                <button
                  onClick={handlePdf}
                  disabled={downloading}
                  className="px-8 py-4 rounded-3xl bg-white text-red-600 text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center gap-3 shadow-2xl"
                >
                  {downloading ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <ArrowDownTrayIcon className="h-5 w-5" />}
                  Download Intelligence Report
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-[40px] bg-white border border-emerald-100 flex items-center gap-8 group shadow-sm hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="text-xl font-black text-gray-900 font-display uppercase tracking-tight">Zone Status: Healthy</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{data.weatherSummary}</p>
              </div>
              <button
                onClick={handlePdf}
                disabled={downloading}
                className="px-6 py-3 rounded-2xl bg-orange-600 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-200"
              >
                {downloading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <ArrowDownTrayIcon className="h-4 w-4" />}
                Generate Report
              </button>
            </div>
          )}

          {/* Forecast Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-black text-gray-900 font-display uppercase tracking-tight">Thermal Variance</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><div className="w-2 h-2 rounded-full bg-orange-600" />Max</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><div className="w-2 h-2 rounded-full border border-gray-400" />Min</div>
                </div>
              </div>
              <GraphCard type="line" data={buildForecastChart()} />
            </div>
            <div className="p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 font-display uppercase tracking-tight mb-10">Precipitation Outlook</h3>
              <GraphCard type="bar" data={buildRainfallChart()} />
            </div>
          </div>

          {/* 7-Day Forecast Grid */}
          {data.upcoming7Days && (
            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-4">7-Day Predictive Cycle</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {data.upcoming7Days.map((day, i) => (
                  <div key={i} className="p-6 rounded-[32px] bg-white border border-gray-50 text-center space-y-4 hover:shadow-2xl hover:border-orange-100 transition-all duration-500 group">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}</p>
                    <div className="py-2 flex justify-center group-hover:scale-125 transition-transform duration-500">{getIcon(day.condition)}</div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-gray-900 font-display">{day.tempMax}°</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day.condition}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
