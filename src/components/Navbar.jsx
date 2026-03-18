import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon, UserCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/live-weather': 'Live Weather',
  '/predictor': 'Predictor',
  '/alerts': 'Alerts',
  '/history': 'History',
};

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const title = pageTitles[location.pathname] || 'System Hub';

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-1 h-6 bg-orange-600 rounded-full" />
        <h1 className="text-lg font-black text-gray-900 font-display tracking-tight uppercase leading-none">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 rounded-xl transition-all hover:bg-gray-50 text-gray-400 hover:text-orange-600 group">
          <BellIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-600 rounded-full border-2 border-white" />
        </button>

        {user && (
          <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
            <div className="flex flex-col items-end">
              <span className="text-sm font-black text-gray-900 leading-none">{user.name}</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Authorized Node</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                <UserCircleIcon className="h-6 w-6" />
              </div>
              <button
                onClick={logout}
                className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all group"
                title="Disconnect"
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
