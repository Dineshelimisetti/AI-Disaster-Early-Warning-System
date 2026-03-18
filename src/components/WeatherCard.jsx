import { CloudIcon, SunIcon, BoltIcon, BeakerIcon } from '@heroicons/react/24/outline';

const WeatherCard = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="p-10 rounded-[40px] bg-white border border-gray-100 shadow-sm animate-pulse space-y-6">
        <div className="h-8 bg-gray-50 rounded-xl w-3/4" />
        <div className="h-20 bg-gray-50 rounded-2xl" />
        <div className="h-10 bg-gray-50 rounded-xl w-1/2" />
      </div>
    );
  }

  if (!data) return null;

  const getGradient = (condition) => {
    const c = (condition || '').toLowerCase();
    if (c.includes('thunder') || c.includes('storm')) return 'from-amber-500/10 via-orange-500/5 to-transparent';
    if (c.includes('rain')) return 'from-blue-500/10 via-sky-500/5 to-transparent';
    if (c.includes('cloud')) return 'from-gray-500/10 via-slate-500/5 to-transparent';
    if (c.includes('haze') || c.includes('fog')) return 'from-gray-400/10 via-slate-400/5 to-transparent';
    return 'from-orange-500/10 via-amber-500/5 to-transparent';
  };

  const getIcon = (c) => {
    const s = (c || '').toLowerCase();
    if (s.includes('thunder')) return <BoltIcon className="h-10 w-10 text-orange-500" />;
    if (s.includes('rain')) return <CloudIcon className="h-10 w-10 text-blue-500" />;
    if (s.includes('cloud')) return <CloudIcon className="h-10 w-10 text-gray-400" />;
    if (s.includes('haze') || s.includes('fog')) return <BeakerIcon className="h-10 w-10 text-gray-300" />;
    return <SunIcon className="h-10 w-10 text-amber-500" />;
  };

  const temp = data.temperature ?? data.tempMax ?? 0;
  const condition = data.condition || 'Clear';

  return (
    <div className={`relative overflow-hidden rounded-[40px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-10 animate-fade-up group hover:shadow-xl transition-all duration-500`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(condition)} pointer-events-none`} />

      <div className="relative z-10 flex items-start justify-between mb-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-black font-display text-gray-900 tracking-tight leading-none group-hover:text-orange-600 transition-colors uppercase">{data.location || 'Location'}</h3>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            {data.state || ''}{data.date ? ` · ${new Date(data.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}` : ''}
          </p>
        </div>
        <div className="w-16 h-16 rounded-[24px] bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          {getIcon(condition)}
        </div>
      </div>

      <div className="relative z-10 mb-10">
        <div className="flex items-baseline">
          <span className="text-7xl font-black font-display text-gray-900 tracking-tighter">{Math.round(temp)}°</span>
          <span className="text-4xl font-light text-gray-300 ml-1">c</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
          <p className="text-lg font-bold text-gray-700 capitalize leading-none font-display tracking-wide">{condition}</p>
        </div>
        {data.description && <p className="text-sm font-medium text-gray-500 mt-3 leading-relaxed border-l-2 border-orange-100 pl-4">{data.description}</p>}
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-y-6 gap-x-10 pt-8 border-t border-gray-50">
        {[
          { label: 'Humidity', val: `${Math.round(data.humidity)}%`, color: 'text-orange-600' },
          { label: 'Wind Velocity', val: `${Math.round(data.windSpeed)} km/h`, color: 'text-blue-600' },
          { label: 'Atmosphere', val: `${Math.round(data.pressure)} hPa`, color: 'text-emerald-600' },
          { label: 'Precipitation', val: `${data.rainfall} mm`, color: 'text-cyan-600' }
        ].map((item, idx) => (
          (data[item.label.toLowerCase().includes('precip') ? 'rainfall' : item.label.toLowerCase().includes('wind') ? 'windSpeed' : item.label.toLowerCase()] != null) && (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
              <p className={`text-lg font-black ${item.color} font-display tracking-tight`}>{item.val}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
