import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PublicHeader from './components/PublicHeader';
import PublicFooter from './components/PublicFooter';
import Dashboard from './pages/Dashboard';
import LiveWeather from './pages/LiveWeather';
import Predictor from './pages/Predictor';
import Alerts from './pages/Alerts';
import History from './pages/History';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import Contact from './pages/Contact';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 rounded-full animate-spin border-gray-300 border-t-orange-600" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white">
    <PublicHeader />
    <main className="flex-1">
      {children}
    </main>
    <PublicFooter />
  </div>
);

import { Outlet } from 'react-router-dom';

const AppLayout = () => (
  <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 ml-[260px] flex flex-col">
      <Navbar />
      <main className="flex-1 p-8 max-w-[1400px] w-full mx-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/what-we-do" element={<PublicLayout><WhatWeDo /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Auth Route */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live-weather" element={<LiveWeather />} />
            <Route path="/predictor" element={<Predictor />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/history" element={<History />} />
            <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
