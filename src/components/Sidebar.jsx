import { Link, NavLink } from 'react-router-dom';
import {
  HomeIcon,
  CloudIcon,
  ChartBarIcon,
  BellAlertIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { to: '/live-weather', label: 'Live Weather', icon: CloudIcon },
  { to: '/predictor', label: 'Predictor', icon: ChartBarIcon },
  { to: '/alerts', label: 'Alerts', icon: BellAlertIcon },
  { to: '/history', label: 'History', icon: ClockIcon },
];

const Sidebar = () => (
  <aside className="fixed left-0 top-0 bottom-0 w-[260px] flex flex-col z-40 bg-white border-r border-gray-100 shadow-[20px_0_40px_-20px_rgba(0,0,0,0.03)]">

    {/* Logo */}
    <Link to="/" className="px-7 py-8 flex items-center group">
      <div className="relative">
        <span className="text-2xl font-black font-display text-gray-900 tracking-tight">
          Disaster<span className="text-orange-600">Watch</span>
        </span>
        <div className="absolute -bottom-1 left-0 w-0 h-1 bg-orange-600 transition-all duration-300 group-hover:w-full rounded-full" />
      </div>
    </Link>

    {/* Nav */}
    <nav className="flex-1 px-4 py-2 space-y-1.5">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] font-bold transition-all duration-300 group
            ${isActive
              ? 'text-white bg-gray-900 shadow-xl shadow-gray-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`
          }
        >
          <Icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`} strokeWidth={2.5} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>

    {/* Footer - Premium Badge */}
    <div className="px-6 py-6 border-t border-gray-50">
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Deployment</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900 font-display">v2.0 Stable</p>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>
      <p className="text-[10px] mt-4 text-center font-bold text-gray-300 uppercase tracking-widest">LPU CAPSTONE · 2025</p>
    </div>
  </aside>
);

export default Sidebar;
