import { useState, useEffect, useRef } from 'react';
import { useWeatherReport, useStates, useDistricts } from '../hooks/useWeather';
import AlertCard from '../components/AlertCard';
import { ArrowPathIcon, ShieldExclamationIcon, ShieldCheckIcon, MagnifyingGlassIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useHistory } from '../hooks/useHistory';
import { useAuth } from '../contexts/AuthContext';

const Alerts = () => {
  const { user } = useAuth();
  const { saveWeatherReport } = useHistory();
  const { data, loading, error, fetchReport } = useWeatherReport();
  const { states } = useStates();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { districts } = useDistricts(selectedState);
  const lastSaved = useRef(null);

  useEffect(() => { if (districts.length > 0 && !selectedDistrict) setSelectedDistrict(districts[0]); }, [districts]);
  const handleSearch = () => { if (selectedDistrict && selectedState) fetchReport(selectedDistrict, selectedState); };

  const risk = data?.disasterAssessment;
  const disasters = risk?.disasters || [];

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
      {/* Search Controls */}
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.3em]">Surveillance Zone</h2>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-400">Territory</label>
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }} className="select-dark py-3">
                <option value="">Select State</option>
                {states.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
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
              {loading ? <ArrowPathIcon className="h-6 w-6 animate-spin" /> : <><ShieldExclamationIcon className="h-5 w-5" />Scan For Threats</>}
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
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Intercepting Weather Matrices...</p>
        </div>
      )}

      {!loading && !data && !error && (
        <div className="p-32 rounded-[40px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-24 h-24 rounded-[32px] bg-orange-50 flex items-center justify-center text-orange-600">
            <ShieldExclamationIcon className="h-12 w-12" strokeWidth={1.5} />
          </div>
          <div className="max-w-md space-y-4">
            <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight uppercase">No Area Selected</h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">Initialize a sector scan to identify potential disaster risks and active atmospheric threats.</p>
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="space-y-10 animate-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm space-y-2">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Risk Category</p>
              <div className="mt-2 text-xl font-black">
                <span className={`px-5 py-2 rounded-2xl text-xs uppercase tracking-widest font-black ${(risk?.riskLevel || 'none').toLowerCase()} bg-opacity-10`}>
                  {risk?.riskLevel || 'Nominal'}
                </span>
              </div>
            </div>
            <div className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm space-y-2">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Current Magnitude</p>
              <div className="text-4xl font-black text-gray-900 font-display">{risk?.riskScore || 0}<span className="text-lg font-light text-gray-300 ml-1">/100</span></div>
            </div>
            <div className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm space-y-2">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Detected Threats</p>
              <div className="text-4xl font-black text-gray-900 font-display">{disasters.length}</div>
            </div>
          </div>

          {risk?.hasDisasterRisk && risk.shouldStayHome && (
            <div className="p-10 rounded-[40px] bg-red-600 text-white shadow-2xl shadow-red-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-20 pointer-events-none" />
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[24px] bg-white text-red-600 flex items-center justify-center animate-bounce">
                    <ShieldExclamationIcon className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black font-display tracking-tight uppercase">Zone Directive: Stay Indoors</h3>
                    <p className="text-white/80 font-medium">{risk.safetyWarning}</p>
                  </div>
                </div>
                {risk.emergencyContacts && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-8 border-t border-white/10">
                    {Object.entries(risk.emergencyContacts).map(([k, v]) => (
                      <div key={k} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-1">
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{k}</p>
                        <p className="text-sm font-black font-display">{v}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-8">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-4">Threat Vectors</h3>
            {disasters.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {disasters.map((d, i) => (
                  <AlertCard key={i} alert={{ title: d.type, severity: d.severity, message: d.description, expectedDate: d.expectedDate, location: `${selectedDistrict}, ${selectedState}`, probability: d.probability }} />
                ))}
              </div>
            ) : (
              <div className="p-20 rounded-[48px] border-2 border-dashed border-emerald-100 bg-emerald-50/20 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-[32px] bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheckIcon className="h-10 w-10" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="text-2xl font-black text-gray-900 font-display tracking-tight uppercase">Sector All-Clear</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">No active disaster threats detected in the current mission area of {selectedDistrict}.</p>
                </div>
              </div>
            )}
          </div>

          {data.recommendations?.length > 0 && (
            <div className="p-10 rounded-[48px] bg-white border border-gray-100 shadow-sm space-y-10">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-2">Containment Protocols</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-6 p-6 rounded-[32px] bg-gray-50 border border-gray-100 group hover:border-orange-100 transition-colors">
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

export default Alerts;
