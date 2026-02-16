import React from 'react';
import { Target, Eye, TrendingUp, Users, Award, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PageMeta } from '@/components/PageMeta';

export const About: React.FC = () => {
  const [missionVisionRef, missionVisionVisible] = useScrollAnimation({ threshold: 0.2 });
  const [impactRef, impactVisible] = useScrollAnimation({ threshold: 0.2 });
  const [timelineRef, timelineVisible] = useScrollAnimation({ threshold: 0.1 });

  const impactStats = [
    { icon: Users, number: '10,000+', label: 'Lives Touched', gradient: 'from-emerald-600 to-teal-600' },
    { icon: Award, number: '5+', label: 'Active Projects', gradient: 'from-teal-600 to-cyan-600' },
    { icon: Calendar, number: '5', label: 'Years of Service', gradient: 'from-cyan-600 to-blue-600' },
    { icon: TrendingUp, number: '95%', label: 'Success Rate', gradient: 'from-blue-600 to-indigo-600' },
  ];

  const timeline = [
    { year: '2020', title: 'Foundation', description: 'HerRise was founded as a small community initiative in Kampala, driven by a vision to empower women and girls.' },
    { year: '2021', title: 'First Major Program', description: 'Launched our Economic Empowerment program, providing microloans and vocational training to 500+ women.' },
    { year: '2022', title: 'National Expansion', description: 'Expanded operations to 5 districts across Uganda, establishing partnerships with local councils and health facilities.' },
    { year: '2023', title: 'GBV Prevention Initiative', description: 'Introduced comprehensive Gender-Based Violence prevention and survivor support programs in rural communities.' },
    { year: '2024', title: 'Digital Innovation', description: 'Launched digital literacy programs and mobile health clinics, reaching remote areas with essential services.' },
    { year: '2025', title: 'Growing Impact', description: 'Today, HerRise serves over 10,000 women and girls annually with holistic, community-driven programs.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <PageMeta
        title="About Us"
        description="HerRise is a national NGO in Uganda committed to creating a society where women and girls are valued, respected, and empowered."
      />

      {/* Hero Section - High-Impact with Background Image */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/Leadership Development.jpg"
            alt="HerRise community impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-emerald-900/80 to-slate-900/90" />
        </div>

        {/* Mission Statement */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Empowering women and girls to build a future of dignity, opportunity, and resilience.
          </h1>
          <p className="text-xl text-slate-200 mb-8 animate-fade-in-up animate-delay-200">
            Creating lasting change through community-driven programs across Uganda.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up animate-delay-300">
            <a
              href="#mission"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105"
            >
              Learn More
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Vision Split Screen */}
      <section
        id="mission"
        ref={missionVisionRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
          {/* Mission - Left */}
          <div
            className={`bg-white p-10 lg:p-12 rounded-2xl shadow-sm border border-slate-200 transition-all duration-700 ${
              missionVisionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="text-emerald-700" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              To advance the rights, dignity, and wellbeing of women and girls through economic empowerment,
              health advocacy, and education. We work hand-in-hand with communities to create sustainable,
              locally-led solutions that address the root causes of gender inequality.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-emerald-700" />
                </div>
                <p className="text-slate-600">Community-driven change and ownership</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-emerald-700" />
                </div>
                <p className="text-slate-600">Holistic programs addressing root causes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-emerald-700" />
                </div>
                <p className="text-slate-600">Long-term sustainability and impact</p>
              </div>
            </div>
          </div>

          {/* Animated Vertical Divider (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-2/3 bg-gradient-to-b from-transparent via-slate-300 to-transparent">
            <div
              className={`w-3 h-3 rounded-full bg-teal-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                missionVisionVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
          </div>

          {/* Vision - Right */}
          <div
            className={`bg-white p-10 lg:p-12 rounded-2xl shadow-sm border border-slate-200 transition-all duration-700 delay-200 mt-8 lg:mt-0 ${
              missionVisionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                <Eye className="text-teal-700" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              A just and equitable society where every woman and girl has the power to determine her own future.
              We envision thriving communities where gender equality is the norm, and women are leaders, decision-makers,
              and agents of positive change.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-teal-700" />
                </div>
                <p className="text-slate-600">Gender equality as the norm</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-teal-700" />
                </div>
                <p className="text-slate-600">Women as leaders and change-makers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={14} className="text-teal-700" />
                </div>
                <p className="text-slate-600">Thriving, empowered communities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Bento Grid */}
      <section ref={impactRef} className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Measurable change and lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                    impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 mb-4">
                    <Icon className="text-slate-700" size={24} />
                  </div>
                  <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section ref={timelineRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <p className="text-lg text-slate-600">
              From a small community initiative to a national force for change.
            </p>
          </div>

          <div className="relative">
            {/* Fading Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-teal-300 to-transparent" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-20 transition-all duration-700 ${
                    timelineVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-teal-500 border-4 border-white shadow-lg" />

                  {/* Content */}
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-teal-300 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 font-bold text-sm rounded-lg">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
