import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const Partnerships: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-gray-900 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          Collaboration is at the heart of our success. We work with diverse stakeholders to achieve scale and sustainability.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {/* Collaborative Approach */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Collaborative Ecosystem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">Government MDAs</h3>
                    <p className="text-sm text-gray-600 mb-2">Ministry of Gender, Labour and Social Development (MOGLSD)</p>
                    <p className="text-sm text-gray-600 mb-2">Ministry of Education (MOE)</p>
                    <p className="text-sm text-gray-600 mb-2">Ministry of Health (MOH)</p>
                    <p className="text-sm text-gray-600 font-semibold mt-2">District Local Governments</p>
                </div>
                <div className="p-4 border-l border-r border-gray-100">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">Civil Society</h3>
                    <p className="text-sm text-gray-600 mb-2">NGOs</p>
                    <p className="text-sm text-gray-600">Coalition building for advocacy, joint research, and shared learning.</p>
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-bold text-purple-700 mb-2">Academic Institutions</h3>
                    <p className="text-sm text-gray-600 mb-2">Uganda Martyrs University (UMU)</p>
                    <p className="text-sm text-gray-600">TVET Institutions</p>
                </div>
            </div>
        </div>

        {/* Partners Grid (Placeholders) */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Trusted By</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white h-24 flex items-center justify-center rounded-lg shadow-sm border border-gray-100 p-4">
                         <span className="text-gray-400 font-bold text-lg">Partner {i}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Call to Action */}
        <div className="bg-teal-600 rounded-2xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Strategic Partner</h2>
            <p className="text-teal-100 max-w-2xl mx-auto mb-8">
                Join us in creating lasting impact. Whether you represent a foundation, a corporation, or an academic institution, we have a place for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-left mb-8">
                 <div className="flex items-start gap-3">
                    <CheckCircle className="flex-shrink-0 text-yellow-300" />
                    <span>Joint Programme Implementation</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="flex-shrink-0 text-yellow-300" />
                    <span>Technical Assistance & Capacity Building</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="flex-shrink-0 text-yellow-300" />
                    <span>Funding & Resource Mobilization</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="flex-shrink-0 text-yellow-300" />
                    <span>Research & Advocacy</span>
                 </div>
            </div>
            <Link to="/contact" className="inline-block bg-white text-teal-700 font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
                Contact Partnership Desk
            </Link>
        </div>

      </div>
    </div>
  );
};