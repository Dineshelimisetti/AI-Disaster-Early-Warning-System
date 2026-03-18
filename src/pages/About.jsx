import { CheckCircleIcon, UserGroupIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const About = () => {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Safety First',
      description: 'We prioritize the safety and well-being of every community we serve',
    },
    {
      icon: SparklesIcon,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI and technology for disaster prediction',
    },
    {
      icon: UserGroupIcon,
      title: 'Community',
      description: 'Building a connected network to strengthen disaster preparedness',
    },
    {
      icon: CheckCircleIcon,
      title: 'Reliability',
      description: 'Providing accurate, real-time weather data and predictions 24/7',
    },
  ];

  const team = [
    { name: 'Team Lead', role: 'Project Director', image: '' },
    { name: 'Backend Engineer', role: 'System Architecture', image: '' },
    { name: 'Frontend Developer', role: 'UI/UX Design', image: '' },
    { name: 'Data Scientist', role: 'AI/ML Specialist', image: '' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <img
            src="/images/team.png"
            alt="Team"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[var(--accent)] text-sm font-bold uppercase">
            Our Story
          </div>

          <h1 className="text-6xl font-black text-white">
            Built for <span className="text-[var(--accent)]">Resilience</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Empowering communities with intelligent disaster prediction.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

          <div className="p-12 rounded-[40px] bg-gray-50 border space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center">
              <SparklesIcon className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              Provide accurate disaster predictions and safety insights.
            </p>
          </div>

          <div className="p-12 rounded-[40px] bg-gray-900 text-white space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center">
              <UserGroupIcon className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-4xl font-black">Our Vision</h2>
            <p className="text-gray-300">
              Build a future where disasters never surprise communities.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-[var(--accent)] uppercase">Foundation</h2>
            <h3 className="text-5xl font-black text-gray-900">Core Values</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="p-10 bg-white rounded-3xl border hover:shadow-xl transition">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-glow)] flex items-center justify-center mb-6">
                  <value.icon className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

          <div>
            <h2 className="text-sm font-bold text-red-600 uppercase">The Challenge</h2>
            <h3 className="text-4xl font-black text-gray-900 mb-6">Why DisasterWatch?</h3>

            {['Late alerts', 'Fragmented data', 'Reactive systems'].map((item, i) => (
              <div key={i} className="flex gap-4 mb-6">
                <div className="w-10 h-10 bg-red-100 text-red-600 flex items-center justify-center rounded-lg">
                  {i + 1}
                </div>
                <p className="text-gray-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="p-12 bg-gray-900 text-white rounded-3xl">
            <h2 className="text-sm text-[var(--accent)] uppercase">Solution</h2>
            <h3 className="text-3xl font-bold mb-6">AI Powered Platform</h3>

            {['Unified Data', 'Real-time Alerts', 'Predictive AI'].map((item, i) => (
              <div key={i} className="mb-4 p-4 bg-white/5 rounded-xl">
                <h4 className="text-[var(--accent)] font-bold">{item}</h4>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-[var(--accent)] uppercase">Team</h2>
            <h3 className="text-5xl font-black text-gray-900">Our Experts</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl text-center shadow hover:shadow-xl">
                <div className="w-24 h-24 mx-auto bg-[var(--accent-glow)] rounded-xl flex items-center justify-center mb-4">
                  <UserGroupIcon className="h-10 w-10 text-[var(--accent)]" />
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-[var(--accent)] text-sm">{member.role}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Impact */}
      <section className="py-32 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

          <div>
            <h2 className="text-[var(--accent)] uppercase">Impact</h2>
            <h3 className="text-4xl font-black">Protecting Communities</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {['28+ States', '50+ Districts', '10K Users', '1M API Calls'].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-[var(--accent)]">{item}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;