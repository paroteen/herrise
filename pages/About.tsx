import React from 'react';
import { Target, Eye, Heart, Globe, Briefcase, Users, UserCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-purple-900 py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-purple-100 max-w-2xl mx-auto px-4">
          HerRise Development Organisation is a national NGO committed to creating a society where women and girls are valued, respected, and empowered.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Intro Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2015, HerRise started as a small community initiative in Kampala and has since grown into a national organisation. We work hand-in-hand with local leaders, government bodies, and international partners to implement sustainable development programmes that address the root causes of gender inequality.
            </p>
            <p className="text-gray-600 leading-relaxed">
                Our team is comprised of passionate social workers, public health experts, educators, and community volunteers who deeply understand the context of the communities we serve.
            </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-purple-500">
                <div className="flex items-center gap-3 mb-4">
                    <Target className="text-purple-600" size={28} />
                    <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-600">
                    To advance the rights, dignity, and wellbeing of women and girls through economic empowerment, health advocacy, and education.
                </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-teal-500">
                <div className="flex items-center gap-3 mb-4">
                    <Eye className="text-teal-600" size={28} />
                    <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600">
                    A just and equitable society where every woman and girl has the power to determine her own future.
                </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-4">
                    <Heart className="text-yellow-600" size={28} />
                    <h3 className="text-xl font-bold text-gray-800">Our Values</h3>
                </div>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                    <li>Integrity & Transparency</li>
                    <li>Inclusivity</li>
                    <li>Community-Led Change</li>
                    <li>Innovation</li>
                    <li>Sustainability</li>
                </ul>
            </div>
        </div>

        {/* Approach Section */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How We Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <img src="/images/Leadership Development.jpg" alt="Team working in field" className="rounded-xl shadow-lg" />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <Globe className="text-purple-600" size={24}/>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">Holistic & Integrated</h4>
                            <p className="text-gray-600 text-sm">We don't just treat symptoms. We combine health, education, and economic programmes to create a safety net for women.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <Briefcase className="text-purple-600" size={24}/>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">Partnership Based</h4>
                            <p className="text-gray-600 text-sm">We collaborate with schools, health facilities, and local councils to ensure our interventions are institutionally supported and sustainable.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                            <Users className="text-purple-600" size={24}/>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">Community Driven</h4>
                            <p className="text-gray-600 text-sm">Our solutions are co-created with the women we serve, ensuring cultural relevance and long-term ownership.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Leadership Team */}
        <div className="text-center bg-purple-50 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-purple-900 mb-8">Our Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-purple-600 mb-4">
                        <UserCircle size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Primrose Kibirigi</h3>
                    <p className="text-purple-600 font-medium mb-2">Executive Director</p>
                    <p className="text-gray-600 text-sm">Leading HerRise with strategic vision and a passion for women's empowerment.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto flex items-center justify-center text-teal-600 mb-4">
                        <UserCircle size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Sarah Nyesigire</h3>
                    <p className="text-teal-600 font-medium mb-2">Programs Director</p>
                    <p className="text-gray-600 text-sm">Overseeing the impactful implementation of our community initiatives.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};