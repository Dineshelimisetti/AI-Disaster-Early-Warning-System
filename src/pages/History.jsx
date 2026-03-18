import { useState, useEffect } from 'react';
import { TrashIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useHistory as useUserHistory } from '../hooks/useHistory';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { downloadPdfReport } from '../services/api';

const History = () => {
  const {
    history,
    stats,
    loading,
    error,
    fetchHistory,
    fetchStats,
    deleteHistory,
    clearAllHistory,
  } = useUserHistory();
  const [downloadingId, setDownloadingId] = useState(null);

  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchHistory(typeFilter);
    fetchStats();
  }, [typeFilter]);

  const handleDelete = async (id) => {
    await deleteHistory(id);
    fetchStats();
  };

  const handleDownload = async (item) => {
    setDownloadingId(item._id);
    try {
      await downloadPdfReport(item.location, item.state);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Archive Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-[11px] font-black text-orange-600 uppercase tracking-[0.4em]">Mission Logs</h2>
          <h3 className="text-4xl font-black font-display text-gray-900 tracking-tight uppercase">Operational Archive</h3>
        </div>

        <div className="flex items-end gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Filter Logs</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="select-dark py-3 min-w-[200px] text-xs">
              <option value="">All Mission Data</option>
              <option value="weather_report">Weather Intelligence</option>
              <option value="prediction">Risk Simulations</option>
            </select>
          </div>
          <button onClick={clearAllHistory} className="px-6 py-3 rounded-2xl bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Format Archive</button>
        </div>
      </div>

      {/* Aggregate Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Intercepts', val: stats.totalReports, color: 'text-gray-900' },
            { label: 'Elevated Risks', val: stats.highRiskCount, color: 'text-orange-600' },
            { label: 'Critical Errors', val: stats.criticalRiskCount, color: 'text-red-600' },
          ].map((s, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
              <div className={`text-5xl font-black font-display tracking-tighter ${s.color}`}>{s.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* States */}
      {loading && (
        <div className="p-32 flex flex-col items-center justify-center space-y-6">
          <div className="w-16 h-16 border-4 rounded-full animate-spin border-gray-100 border-t-orange-600" />
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Retrieving Log Files...</p>
        </div>
      )}

      {error && (
        <div className="p-6 rounded-3xl border border-yellow-100 bg-yellow-50 text-yellow-800 font-bold flex items-center gap-4">
          <ShieldExclamationIcon className="h-6 w-6 text-yellow-600" />
          {error}
        </div>
      )}

      {!loading && history.length === 0 && (
        <div className="p-32 rounded-[48px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center space-y-8">
          <div className="w-24 h-24 rounded-[32px] bg-orange-50 flex items-center justify-center text-orange-600">
            <TrashIcon className="h-12 w-12" strokeWidth={1} />
          </div>
          <div className="max-w-md space-y-4">
            <h3 className="text-3xl font-black text-gray-900 font-display tracking-tight uppercase">Archive Empty</h3>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">No operational logs found in the mission buffer. Execute a weather scan or prediction to record data.</p>
          </div>
        </div>
      )}

      {/* Data Table */}
      {history.length > 0 && (
        <div className="rounded-[40px] bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                {['Timestamp', 'Mission Type', 'Sector Range', 'Threat Profile', 'Action'].map((h) => (
                  <th key={h} className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((item) => (
                <tr key={item._id} className="hover:bg-orange-50/10 transition-colors group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <p className="text-sm font-black text-gray-900 font-display">{new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${item.reportType === 'weather_report' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                      {item.reportType === 'weather_report' ? 'Intelligence' : 'Simulation'}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <p className="text-sm font-bold text-gray-700">{item.location}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.state}</p>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${(!item.riskLevel || item.riskLevel === 'None') ? 'bg-emerald-500' : item.riskLevel.toLowerCase() === 'critical' ? 'bg-red-600 animate-pulse' : 'bg-orange-500'}`} />
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.riskLevel || 'Nominal'}</p>
                      {item.riskScore != null && <span className="text-[10px] font-black text-gray-300 ml-1">{item.riskScore} MAG</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownload(item)}
                        disabled={downloadingId === item._id}
                        className="p-3 rounded-2xl text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all opacity-0 group-hover:opacity-100"
                        title="Download Analysis"
                      >
                        {downloadingId === item._id ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <ArrowDownTrayIcon className="h-5 w-5" />}
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-3 rounded-2xl text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
