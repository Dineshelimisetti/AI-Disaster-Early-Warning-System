import { useState, useEffect, useRef } from 'react';
import { useWeatherReport, useStates, useDistricts } from '../hooks/useWeather';
import { downloadPdfReport } from '../services/api';
import WeatherCard from '../components/WeatherCard';
import GraphCard from '../components/GraphCard';
import { ArrowDownTrayIcon, ArrowPathIcon, ExclamationTriangleIcon, CheckCircleIcon, MagnifyingGlassIcon, GlobeAltIcon, BoltIcon, CloudIcon, SunIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useHistory } from '../hooks/useHistory';
import { useAuth } from '../contexts/AuthContext';

const LiveWeather = () => {
  const { data, loading, error, fetchReport } = useWeatherReport();
  const { states } = useStates();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { districts } = useDistricts(selectedState);
  const [downloading, setDownloading] = useState(false);

  const { saveWeatherReport } = useHistory();
  const { user } = useAuth();
  const lastSaved = useRef(null);

  useEffect(() => { if (districts.length > 0 && !selectedDistrict) setSelectedDistrict(districts[0]); }, [districts]);
  const handleSearch = () => { if (selectedDistrict && selectedState) fetchReport(selectedDistrict, selectedState); };
  const handlePdf = async () => { setDownloading(true); try { await downloadPdfReport(selectedDistrict, selectedState); } catch (e) { } finally { setDownloading(false); } };

  const getIcon = (c) => {
    const s = (c || '').toLowerCase();
    if (s.includes('thunder')) return <BoltIcon className="h-6 w-6 text-orange-500" />;
    if (s.includes('rain')) return <CloudIcon className="h-6 w-6 text-blue-500" />;
    if (s.includes('cloud')) return <CloudIcon className="h-6 w-6 text-gray-400" />;
    if (s.includes('haze') || s.includes('fog')) return <BeakerIcon className="h-6 w-6 text-gray-300" />;
    return <SunIcon className="h-6 w-6 text-amber-500" />;
  };

  const today = data?.today;
  const risk = data?.disasterAssessment;

  useEffect(() => {
    if (!data || !user) return;
    const key = `${selectedState}-${selectedDistrict}-${JSON.stringify(data)}`;
    if (lastSaved.current === key) return;
    lastSaved.current = key;

    saveWeatherReport({
      location: selectedDistrict,
      state: selectedState,
      district: selectedDistrict,
      weatherData: data,
      riskLevel: risk?.riskLevel,
      riskScore: risk?.riskScore,
    }).catch(console.error);
  }, [data, user]);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Intelligence Controls */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em]">Operational Node</h2>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-400">Territory</label>
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }} className="select-dark py-3">
                <option value="">Select State</option>
                {states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-400">Sector</label>
              <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="select-dark py-3">
                <option value="">Select District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="lg:col-span-4">
            <button onClick={handleSearch} disabled={loading || !selectedDistrict} className="w-full btn-accent py-4 text-base shadow-orange-200">
              {loading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <><GlobeAltIcon className="h-5 w-5" />Acquire Telemetry</>}
            </button>
          </div>

          <div className="lg:col-span-2">
            <button
              onClick={handlePdf}
              disabled={downloading || !data}
              className="w-full py-4 rounded-2xl bg-orange-600 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-700 disabled:bg-gray-100 disabled:text-gray-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
            >
              {downloading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <ArrowDownTrayIcon className="h-4 w-4" />}
              Generate PDF
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
          <div className="w-20 h-20 border-4 rounded-full animate-spin border-gray-100 border-t-orange-600" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Compiling Atmospheric Report...</p>
        </div>
      )}

      {!loading && !data && !error && (
        <div className="p-32 rounded-[40px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-24 h-24 rounded-[32px] bg-orange-50 flex items-center justify-center text-orange-600">
            <GlobeAltIcon className="h-12 w-12" strokeWidth={1.5} />
          </div>
          <div className="max-w-md space-y-4">
            <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight uppercase">Satellite Link Standby</h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">Select a coordinate sector above to download real-time weather matrices and disaster risk assessments.</p>
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="space-y-10 animate-fade-up">
          <WeatherCard data={today} />

          {/* Alert Banner */}
          {risk?.hasDisasterRisk ? (
            <div className="p-10 rounded-[40px] bg-red-600 text-white shadow-2xl shadow-red-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-20 pointer-events-none" />
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[24px] bg-white text-red-600 flex items-center justify-center animate-bounce">
                    <ExclamationTriangleIcon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black font-display tracking-tight uppercase">High Urgency Threat</h3>
                    <p className="text-white/80 font-medium text-lg">{risk.safetyWarning}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {risk.disasters?.map((d, i) => (
                    <span key={i} className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest border border-white/20">
                      {d.type} · {d.severity} · {d.probability}% Risk
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-[40px] bg-white border border-emerald-100 flex items-center gap-8 group shadow-sm hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircleIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-gray-900 font-display uppercase tracking-tight">Zone Status: Nominal</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{data.weatherSummary}</p>
              </div>
            </div>
          )}

          {/* Past & Upcoming Cycles */}
          {['past7Days', 'upcoming7Days'].map(key => data[key] && (
            <div key={key} className="space-y-8">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-4">{key === 'past7Days' ? 'Retrospective Cycle' : 'Predictive Cycle'}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {data[key].map((day, i) => (
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
          ))}

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-10 rounded-[48px] bg-white border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 font-display uppercase tracking-tight mb-10">Temperature Variance</h3>
              <GraphCard type="line" data={data.past7Days ? { labels: data.past7Days.map(d => new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })), datasets: [{ label: 'Max °C', data: data.past7Days.map(d => d.tempMax), borderColor: '#ea580c', backgroundColor: 'rgba(234,88,12,0.05)', fill: true, tension: 0.4 }, { label: 'Min °C', data: data.past7Days.map(d => d.tempMin), borderColor: '#94a3b8', backgroundColor: 'transparent', fill: false, tension: 0.4 }] } : null} />
            </div>
            <div className="p-10 rounded-[48px] bg-white border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-gray-900 font-display uppercase tracking-tight mb-10">Atmospheric Density</h3>
              <GraphCard type="line" data={data.upcoming7Days ? { labels: data.upcoming7Days.map(d => new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })), datasets: [{ label: 'Humidity %', data: data.upcoming7Days.map(d => d.humidity), borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.05)', fill: true, tension: 0.4 }, { label: 'Wind Velocity', data: data.upcoming7Days.map(d => d.windSpeed), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.05)', fill: true, tension: 0.4 }] } : null} />
            </div>
          </div>

          {/* Protocol Directives */}
          {data.recommendations && (
            <div className="p-10 rounded-[48px] bg-white border border-gray-100 shadow-sm space-y-10">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">Strategy Recommendations</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-6 p-6 rounded-[32px] bg-gray-50 border border-gray-100 group hover:border-orange-100 transition-all">
                    <span className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black text-white bg-gray-900 group-hover:bg-orange-600 transition-colors flex-shrink-0">{i + 1}</span>
                    <span className="text-base font-bold text-gray-600 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveWeather;
