import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      content: 'support@disasterwatch.in',
      subtext: 'Online support 24/7',
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      content: '+91 1800-123-4567',
      subtext: 'Mon-Fri from 9am to 6pm',
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      content: 'New Delhi, India',
      subtext: 'Innovation Hub, Sector 62',
    },
    {
      icon: ClockIcon,
      title: 'Working Hours',
      content: '24/7 Monitoring',
      subtext: 'Always alert, always active',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section - Visual Context */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/images/india-landscape.png"
            alt="India landscape backdrop"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-sm font-bold tracking-[0.2em] uppercase">
            Communication Hub
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight">
            Connect with <span className="text-orange-500">Confidence</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Have questions about our technology or need regional assistance? Our team is always ready to support your community.
          </p>
        </div>
      </section>

      {/* Global Contact Grid - Glassmorphism Cards */}
      <section className="py-32 px-6 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <div key={i} className="p-10 bg-white/70 backdrop-blur-3xl rounded-[32px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <info.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">{info.title}</h3>
                <p className="text-xl font-black text-gray-900 mb-2 truncate w-full">{info.content}</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{info.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Support Channels - High Contrast Split */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em]">Direct Line</h2>
                <h3 className="text-5xl font-black text-gray-900 leading-tight">Emergency <br /> Response Protocol</h3>
              </div>

              <div className="p-10 rounded-[40px] bg-white border-l-8 border-orange-600 shadow-2xl shadow-orange-100 space-y-6">
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  For immediate threat reporting or critical algorithmic failures in your region, contact our 24/7 Rapid Response Unit.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Hotline</p>
                  <p className="text-4xl font-black text-gray-900">+91 1800-DISASTER</p>
                </div>
                <div className="pt-6">
                  <button className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200">
                    Verify Network Status
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-12 py-10">
              <div className="space-y-8">
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">Strategic Initiatives</h4>
                <div className="space-y-8">
                  {[
                    { title: 'Regional Data Integration', desc: 'Request customized monitoring nodes for underserved locations across India.' },
                    { title: 'Institutional Partnerships', desc: 'Enterprise-grade disaster intelligence for government and non-profit sectors.' },
                    { title: 'Community Feedback', desc: 'Direct channel for on-ground weather anomaly reports and feature requests.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-2 h-12 bg-gray-200 group-hover:bg-orange-600 transition-colors rounded-full" />
                      <div>
                        <h5 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">{item.title}</h5>
                        <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Architecture - Clean Management */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em]">Intelligence Hub</h2>
            <h3 className="text-5xl font-black text-gray-900 tracking-tight">System FAQ</h3>
          </div>

          <div className="space-y-6">
            {[
              { q: 'How accurate are your predictions?', a: 'Our AI models leverage real-time satellite telemetry and historical datasets, typically achieving 85-95% accuracy for 48-hour outlooks.' },
              { q: 'Is there a cost for community access?', a: 'DisasterWatch remains a free-tier platform for all Indian citizens as part of our commitment to national safety and resilience.' },
              { q: 'How often is the telemetry updated?', a: 'Ground station data is processed in sub-60 second cycles, while global prediction models recalculate every 15 minutes.' },
              { q: 'Data privacy protocols?', a: 'We utilize state-of-the-art encryption standards. Search telemetry is anonymized to protect individual user privacy.' }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:border-orange-100 hover:shadow-xl transition-all duration-300">
                <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{faq.q}</h4>
                <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
