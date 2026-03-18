import { ExclamationTriangleIcon, MapPinIcon } from '@heroicons/react/24/outline';

const severityColors = {
  low: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', iconBg: 'bg-emerald-100' },
  moderate: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', iconBg: 'bg-amber-100' },
  high: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600', iconBg: 'bg-orange-100' },
  critical: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600', iconBg: 'bg-red-100' },
};

const AlertCard = ({ alert }) => {
  if (!alert) return null;
  const colors = severityColors[(alert.severity || 'low').toLowerCase()] || severityColors.low;

  return (
    <div className={`p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group animate-fade-up`}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
        <div className={`w-16 h-16 rounded-[24px] ${colors.iconBg} ${colors.text} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <ExclamationTriangleIcon className="h-8 w-8" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-xl font-black font-display text-gray-900 tracking-tight uppercase leading-none">{alert.title || 'Mission Alert'}</h4>
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${colors.bg} ${colors.text} ${colors.border}`}>
              {alert.severity}
            </span>
            {alert.probability && (
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                {alert.probability}% Confidence
              </span>
            )}
          </div>

          <p className="text-lg font-medium text-gray-500 leading-relaxed max-w-4xl">{alert.message}</p>

          <div className="flex flex-wrap items-center gap-8 pt-2">
            {alert.location && (
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-orange-600" />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{alert.location}</span>
              </div>
            )}
            {alert.expectedDate && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Intercept Expected: {alert.expectedDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
