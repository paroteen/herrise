import React from 'react';
import { Heart, Hand, Gift, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GetInvolved: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-yellow-500 py-20 text-center text-white">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Get Involved</h1>
        <p className="text-slate-800 max-w-2xl mx-auto px-4 font-medium">
          Your time, skills, and resources can change lives. Here is how you can support HerRise.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Volunteer */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-1 transition-transform">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
                    <Hand size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Volunteer</h3>
                <p className="text-gray-600 mb-6">
                    Join our team on the ground or remotely. We need mentors, trainers, and administrative support.
                </p>
                <Link to="/contact" className="text-teal-600 font-bold hover:underline">Apply to Volunteer</Link>
            </div>

            {/* Donate */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-1 transition-transform border-2 border-yellow-400">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
                    <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Make a Donation</h3>
                <p className="text-gray-600 mb-6">
                    Every shilling counts. Support a specific project or give to our general fund to keep the lights on.
                </p>
                <button className="bg-yellow-500 text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-600">
                    Donate Now
                </button>
            </div>

            {/* Partner */}
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:-translate-y-1 transition-transform">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                    <Gift size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">In-Kind Support</h3>
                <p className="text-gray-600 mb-6">
                    Donate equipment, scholastic materials, sanitary pads, or office supplies.
                </p>
                <Link to="/contact" className="text-purple-600 font-bold hover:underline">Contact Us</Link>
            </div>
        </div>

        {/* Donation Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Ways to Donate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <CreditCard size={20}/> Bank Transfer
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-md text-sm text-gray-700 space-y-2">
                        <p><span className="font-semibold">Bank Name:</span> Stanbic Bank Uganda</p>
                        <p><span className="font-semibold">Account Name:</span> HerRise Development Org</p>
                        <p><span className="font-semibold">Account Number:</span> 903000XXXXXXX</p>
                        <p><span className="font-semibold">Branch:</span> Forest Mall</p>
                        <p><span className="font-semibold">Swift Code:</span> SBICUGKXXXX</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <CreditCard size={20}/> Mobile Money
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-md text-sm text-gray-700 space-y-2">
                        <p>We accept MTN Mobile Money and Airtel Money.</p>
                        <p><span className="font-semibold">MTN Merchant Code:</span> 123456</p>
                        <p><span className="font-semibold">Airtel Pay:</span> 654321</p>
                        <p className="italic text-gray-500 mt-4">*Please use "Donation" as the reference reason.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};