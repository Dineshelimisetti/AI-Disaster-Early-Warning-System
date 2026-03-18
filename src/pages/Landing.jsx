import { Link } from 'react-router-dom';
import { ChevronRightIcon, CloudIcon, ShieldCheckIcon, MapPinIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      title: 'Real-time Weather',
      description: 'Get accurate weather data from WeatherAPI with real-time updates',
      icon: CloudIcon,
    },
    {
      title: 'Disaster Prediction',
      description: 'AI-powered predictions to identify potential disaster risks',
      icon: ArrowTrendingUpIcon,
    },
    {
      title: 'Safety Alerts',
      description: 'Immediate alerts and recommendations for disaster preparation',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Location Tracking',
      description: 'Monitor weather for specific locations across India',
      icon: MapPinIcon,
    },
  ];

  const stats = [
    { number: '50+', label: 'Districts Monitored' },
    { number: '28', label: 'States Covered' },
    { number: '10K+', label: 'Active Users' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-100 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-sm font-semibold tracking-wide uppercase transition-transform hover:scale-105 cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                AI-Powered Prediction Engine
              </div>

              <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Protecting Lives with <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Intelligent Data</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Stay ahead of natural disasters with DisasterWatch. Our advanced AI models and real-time data integration provide the clarity you need to stay safe.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  to="/auth"
                  className="px-10 py-5 bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  Get Started Free
                  <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                >
                  Explore Technology
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                      <div className="w-full h-full bg-gradient-to-br from-orange-200 to-amber-200"></div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Trusted by <span className="text-orange-600 font-bold">10,000+</span> users across India
                </div>
              </div>
            </div>

            <div className="relative group">
              {/* Glassmorphism Card */}
              <div className="relative z-10 bg-white/70 backdrop-blur-3xl border border-white/20 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>

                <div className="space-y-8 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-1">Current Risk Level</p>
                      <h3 className="text-3xl font-black text-gray-900">Moderate Risk</h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                      <CloudIcon className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Atmospheric Pressure</span>
                        <span className="text-sm font-bold text-gray-900">1012 hPa</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[65%]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Temperature</p>
                        <p className="text-2xl font-black text-gray-900">28°C</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-gray-50/50 border border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Humidity</p>
                        <p className="text-2xl font-black text-gray-900">72%</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-lg">
                    <MapPinIcon className="h-5 w-5 text-orange-400" />
                    <span className="text-sm font-bold">Mumbai, Maharashtra</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements behind the card */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600 rounded-3xl rotate-12 opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium Counter */}
      <section className="relative z-20 -mt-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 divide-y divide-x lg:divide-y-0 divide-gray-800">
            {stats.map((stat, i) => (
              <div key={i} className="px-10 py-12 text-center group hover:bg-gray-800/50 transition-colors">
                <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-orange-500/80 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em]">Core Platform</h2>
            <h3 className="text-5xl font-black text-gray-900">Advanced Capabilities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="relative p-10 rounded-[32px] bg-gray-50 border border-gray-100 group hover:bg-white hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(234,88,12,0.1)] transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-500">
                  <feature.icon className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  {feature.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase tracking-widest">
                  Read more <ChevronRightIcon className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Visual Storytelling */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[40px] bg-gray-900 py-24 lg:py-32 px-8 lg:px-20 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ea580c 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-orange-600/30 to-transparent pointer-events-none"></div>

            <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                Be Prepared. <br />
                <span className="text-orange-500">Save Communities.</span>
              </h2>
              <p className="text-xl text-orange-50 leading-relaxed font-medium">
                Our AI-driven alerts reached over 1,000 communities during the last monsoon season. Join the network that's making India safer.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link
                  to="/auth"
                  className="px-12 py-5 bg-orange-600 text-white rounded-2xl font-black text-lg hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300 shadow-2xl shadow-orange-600/40"
                >
                  Create Your Free Account
                </Link>
                <Link
                  to="/contact"
                  className="px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl font-black text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Safety Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
