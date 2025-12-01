import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, TrendingUp, BookOpen } from 'lucide-react';
import { Stat } from '../types';

const stats: Stat[] = [
  { label: 'Women Empowered', value: '300', description: 'Across 30 active women\'s groups' },
  { label: 'Girls in School', value: '50+', description: 'Supported with materials & mentorship' },
  { label: 'Districts', value: '2', description: 'Active community presence' },
  { label: 'Health Outreach', value: '450+', description: 'Community members reached' },
];

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <div className="relative bg-purple-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="/images/Economic Empowerment.jpg" 
            alt="Ugandan women gathering" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Empowering Women, <br/>
              <span className="text-yellow-400">Transforming Communities</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
              HerRise Development Organisation is dedicated to advancing the rights, wellbeing, and leadership of women and girls across Uganda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/programmes" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-900 bg-white hover:bg-purple-50 transition-colors"
              >
                Our Work
              </Link>
              <Link 
                to="/get-involved" 
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Support Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-teal-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold text-yellow-300 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-teal-100">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Holistic Approach</h2>
            <p className="text-gray-600">
              We believe in a world where every woman and girl has the opportunity to thrive. Our programmes are designed to address the multifaceted challenges they face.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center text-purple-600 mb-6">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Economic Empowerment</h3>
              <p className="text-gray-600 mb-4">
                Equipping women with financial literacy, vocational skills, and resources to start sustainable businesses.
              </p>
              <Link to="/programmes" className="text-purple-600 font-medium inline-flex items-center hover:text-purple-700">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center text-teal-600 mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rights & Protection</h3>
              <p className="text-gray-600 mb-4">
                Advocating against Gender-Based Violence and providing support systems for survivors.
              </p>
              <Link to="/programmes" className="text-teal-600 font-medium inline-flex items-center hover:text-teal-700">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center text-yellow-600 mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Leadership</h3>
              <p className="text-gray-600 mb-4">
                Nurturing the next generation of female leaders to drive change in their local communities.
              </p>
              <Link to="/programmes" className="text-yellow-600 font-medium inline-flex items-center hover:text-yellow-700">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story / CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="/images/Partner With Us for Change .webp" 
                  alt="Community meeting" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Partner With Us for Change</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Sustainable change requires collective action. Whether you are a donor, a corporate partner, or a volunteer, your contribution helps us expand our reach to the most vulnerable regions of Uganda. Join us in building a future where every woman is free, safe, and empowered.
                </p>
                <div>
                    <Link 
                    to="/contact" 
                    className="inline-block bg-purple-700 text-white font-semibold px-8 py-3 rounded-md hover:bg-purple-800 transition-colors shadow-md"
                    >
                    Contact Our Team
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};