import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const PredictionCard = ({ prediction, loading = false }) => {
  if (loading) {
    return (
      <div className="h-full min-h-[600px] rounded-[48px] bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center p-12 space-y-8 animate-pulse">
        <div className="w-32 h-32 rounded-full border-4 border-gray-50 border-t-orange-600 animate-spin" />
        <div className="space-y-4 w-full max-w-sm">
          <div className="h-4 bg-gray-50 rounded-full w-3/4 mx-auto" />
          <div className="h-4 bg-gray-50 rounded-full w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!prediction) return null;

  const riskScore = prediction.riskScore || 0;
  const severity = (prediction.severity || 'Low').toLowerCase();
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (riskScore / 100) * circumference;

  const getColor = () => {
    if (severity === 'critical') return '#dc2626';
    if (severity === 'high') return '#ea580c';
    if (severity === 'moderate') return '#f59e0b';
    return '#10b981';
  };

  const getBgColor = () => {
    if (severity === 'critical') return 'bg-red-50 text-red-600 border-red-100';
    if (severity === 'high') return 'bg-orange-50 text-orange-600 border-orange-100';
    if (severity === 'moderate') return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  };

  return (
    <div className="h-full rounded-[48px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col animate-fade-up">
      <div className="p-10 flex-1 space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">Analysis Complete</h3>
            <h4 className="text-2xl font-black font-display text-gray-900 tracking-tight uppercase">Simulation Result</h4>
          </div>
          <span className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border ${getBgColor()}`}>
            {prediction.severity || 'Stable'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Gauge */}
          <div className="relative flex justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f8fafc" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke={getColor()} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={dashOffset} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black font-display text-gray-900 tracking-tighter">{riskScore}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mt-1">Magnitude</span>
              </div>
            </div>
            {/* Ambient Glow */}
            <div className="absolute inset-0 blur-[60px] opacity-20 pointer-events-none" style={{ backgroundColor: getColor() }} />
          </div>

          <div className="space-y-6">
            {prediction.disasterType && prediction.disasterType !== 'None' && (
              <div className={`p-6 rounded-3xl border ${getBgColor()} space-y-2`}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Probable Threat</p>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-black font-display uppercase tracking-tight">{prediction.disasterType}</p>
                  <p className="text-2xl font-black font-display">{typeof prediction.probability === 'number' ? (prediction.probability * 100).toFixed(0) : prediction.probability}%</p>
                </div>
              </div>
            )}

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-400">
                <ExclamationTriangleIcon className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confidence Level</p>
                <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">94.8% Precision Matrix</p>
              </div>
            </div>
          </div>
        </div>

        {prediction.detailedAnalysis && (
          <div className="p-8 rounded-[32px] bg-gray-50/50 border border-gray-100 italic">
            <p className="text-base font-medium leading-relaxed text-gray-600">"{prediction.detailedAnalysis}"</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {prediction.recommendations?.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Protocol Directives</h4>
              <ul className="space-y-4">
                {prediction.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-50 hover:border-orange-100 transition-colors group">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white bg-gray-900 group-hover:bg-orange-600 transition-colors flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm font-bold text-gray-600 leading-snug">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prediction.safePlacesInWorld?.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] pl-1">Secure Zones</h4>
              <div className="flex flex-wrap gap-3">
                {prediction.safePlacesInWorld.map((place, i) => (
                  <span key={i} className="px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-2xl text-emerald-600 bg-emerald-50 border border-emerald-100 hover:scale-105 transition-transform cursor-default">
                    {place}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {prediction.shouldStayHome && (
        <div className="bg-red-600 p-8 text-white flex items-center justify-between group cursor-default">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center animate-pulse">
              <ExclamationTriangleIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black font-display tracking-tight uppercase leading-none">Directive: Stay Home</p>
              <p className="text-sm font-medium text-white/80">{prediction.safetyWarning}</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-2xl font-black">!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionCard;
