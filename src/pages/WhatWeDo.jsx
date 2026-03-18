import { CloudIcon, BoltIcon, ChartBarIcon, BellIcon, MapIcon, CheckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const WhatWeDo = () => {
  const services = [
    {
      icon: CloudIcon,
      title: 'Real-time Weather Data',
      description: 'Access accurate, up-to-the-minute weather information for any location in India',
      features: ['Current conditions', 'Hourly forecast', 'Air quality index', 'UV Index'],
    },
    {
      icon: BoltIcon,
      title: 'Disaster Prediction',
      description: 'AI-powered analysis to predict potential natural disasters and assess risk levels',
      features: ['Risk assessment', 'Pattern recognition', 'Historical analysis', 'Trend forecasting'],
    },
    {
      icon: BellIcon,
      title: 'Smart Alerts',
      description: 'Receive timely, location-specific alerts before disaster events occur',
      features: ['Instant notifications', 'Risk level indicators', 'Safety recommendations', 'Emergency contacts'],
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Reports',
      description: 'Comprehensive weather reports and historical data analysis for research and planning',
      features: ['7-day forecast', 'Historical trends', 'PDF reports', 'Data export'],
    },
  ];

  const workflow = [
    {
      step: '01',
      title: 'Data Collection',
      description: 'We gather data from WeatherAPI, covering temperature, humidity, pressure, rainfall, and wind patterns',
    },
    {
      step: '02',
      title: 'Analysis',
      description: 'Our AI models analyze weather patterns against historical disaster data to identify risk factors',
    },
    {
      step: '03',
      title: 'Prediction',
      description: 'Machine learning algorithms generate disaster risk scores and predictions for selected locations',
    },
    {
      step: '04',
      title: 'Alert Generation',
      description: 'When risks are detected, automated alerts are sent to users with actionable safety recommendations',
    },
    {
      step: '05',
      title: 'Community Response',
      description: 'Communities receive real-time information to make informed decisions and prepare accordingly',
    },
    {
      step: '06',
      title: 'Historical Tracking',
      description: 'All reports and predictions are saved to user history for analysis and pattern recognition',
    },
  ];

  const disasterTypes = [
    { name: 'Flash Floods', description: 'Predicted based on rainfall intensity and water level data' },
    { name: 'Cyclones', description: 'Identified through wind speed and pressure anomalies' },
    { name: 'Thunderstorms', description: 'Detected via atmospheric conditions and temperature variations' },
    { name: 'Heavy Fog', description: 'Predicted based on visibility and atmospheric humidity' },
    { name: 'Heatwaves', description: 'Identified through extreme temperature patterns' },
    { name: 'Cold Waves', description: 'Predicted based on temperature dips and weather patterns' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section - Visual Storytelling */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src="/images/weather-data.png"
            alt="Weather data visualization"
            className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-sm font-bold tracking-[0.2em] uppercase">
            Our Expertise
          </div>
          <h1 className="text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            Predicting the <span className="text-orange-500">Unpredictable</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Comprehensive weather intelligence and disaster prediction services engineered for accuracy and community safety.
          </p>
        </div>
      </section>

      {/* Services Showcase - Premium Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <div key={i} className="p-12 rounded-[40px] bg-gray-50 border border-gray-100 space-y-8 hover:bg-white hover:shadow-2xl hover:border-orange-100 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-[20px] bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">{service.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">{service.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200/50">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckIcon className="h-3 w-3" strokeWidth={3} />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow - High-end Visual Guide */}
      <section className="py-32 px-6 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em]">Operational Flow</h2>
            <h3 className="text-5xl font-black tracking-tight">How It Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {workflow.map((item, i) => (
              <div key={i} className="relative group">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-6xl font-black text-white/5 group-hover:text-orange-500/20 transition-colors">
                    {item.step}
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-orange-500 transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disaster Monitoring - Glassmorphism Grid */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em]">Early Warning</h2>
            <h3 className="text-5xl font-black text-gray-900 tracking-tight">Monitoring & Response</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasterTypes.map((disaster, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-[32px] hover:shadow-xl hover:border-orange-100 transition-all duration-500 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{disaster.name}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{disaster.description}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  View protocol
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack - Scientific Lab Aesthetic */}
      <section className="py-32 px-6 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.3em]">Infrastructure</h2>
            <h3 className="text-5xl font-black text-white tracking-tight leading-tight">Driven by <span className="text-orange-500">Intelligence</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Data Sources',
                items: ['WeatherAPI.com Real-time', 'Satellite Imagery Analysis', 'NRT Ground Stations', 'Gov Database APIs']
              },
              {
                title: 'AI & Analytics',
                items: ['Custom Neural Networks', 'Pattern Matching AI', 'Predictive Analysis', 'Advanced AI Models']
              },
              {
                title: 'Infrastructure',
                items: ['Hybrid Cloud Architecture', 'Secure Data Encryption', 'Real-time CDN Delivery', 'LPU Innovation Hub']
              }
            ].map((col, i) => (
              <div key={i} className="space-y-8 p-10 bg-white/5 border-l-2 border-orange-600/30 rounded-r-3xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-black text-white uppercase tracking-wider">{col.title}</h3>
                <ul className="space-y-4">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-400 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:scale-150 transition-transform" />
                      <span className="font-medium text-sm tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Feature Showcase */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Location-based', icon: MapIcon },
                { title: '7-Day Forecast', icon: ChartBarIcon },
                { title: 'Instant Alerts', icon: BellIcon },
                { title: 'Secure Vault', icon: ShieldCheckIcon }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                  <feat.icon className="w-10 h-10 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold text-gray-900">{feat.title}</h4>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em]">Product Ecosystem</h2>
                <h3 className="text-5xl font-black text-gray-900 leading-tight tracking-tight">Seamless Safety Across <span className="text-orange-600">All Platforms</span></h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Our features are built with the user in mind—providing a clean, intuitive interface that delivers critical information when it matters most.
              </p>
              <div className="pt-6">
                <button className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-orange-200">
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;
