import React from 'react';
import { BookOpen, DollarSign, HeartPulse, ShieldAlert, Users } from 'lucide-react';
import { Programme } from '../types';

const programmes: Programme[] = [
  {
    id: 'economic',
    title: 'Economic Empowerment',
    icon: <DollarSign size={40} />,
    description: 'We form Village Savings and Loan Associations (VSLAs) and provide vocational training in agriculture, tailoring, and crafts.',
    impact: 'Our 30 women\'s groups (300 members) have started sustainable small businesses, improving household income stability.',
    image: 'https://picsum.photos/id/292/800/600'
  },
  {
    id: 'health',
    title: 'Health Support',
    icon: <HeartPulse size={40} />,
    description: 'Focusing on Sexual and Reproductive Health and Rights (SRHR), maternal health, and hygiene promotion in rural areas.',
    impact: 'Reaching women and girls in our partner districts with essential health information and referrals.',
    image: 'https://picsum.photos/id/338/800/600'
  },
  {
    id: 'gbv',
    title: 'GBV Prevention & Response',
    icon: <ShieldAlert size={40} />,
    description: 'Community dialogues, legal aid clinics, and psycho-social support for survivors of domestic violence and abuse.',
    impact: 'Provided counseling and guidance to survivors within our active community groups.',
    image: 'https://picsum.photos/id/1027/800/600'
  },
  {
    id: 'education',
    title: 'Education Support',
    icon: <BookOpen size={40} />,
    description: 'Scholarships for vulnerable girls, mentorship programmes, and provision of scholastic materials and sanitary pads.',
    impact: 'Supporting over 50 vulnerable girls with scholastic materials and mentorship.',
    image: 'https://picsum.photos/id/453/800/600'
  },
  {
    id: 'leadership',
    title: 'Leadership Development',
    icon: <Users size={40} />,
    description: 'Training young women in public speaking, civic rights, and advocacy to participate in local governance.',
    impact: 'Members of our women\'s groups are increasingly taking up leadership roles in their local councils.',
    image: 'https://picsum.photos/id/64/800/600'
  }
];

export const Programmes: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
       <div className="bg-teal-700 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Our Programmes</h1>
        <p className="text-teal-100 max-w-2xl mx-auto px-4">
          Targeted interventions designed to uplift, protect, and empower.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20">
        {programmes.map((prog, index) => (
            <div key={prog.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <img src={prog.image} alt={prog.title} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 bg-white p-3 rounded-full text-teal-600 shadow-sm">
                            {prog.icon}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">{prog.title}</h2>
                    <div className="w-20 h-1 bg-yellow-400"></div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {prog.description}
                    </p>
                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                        <h4 className="font-bold text-purple-900 mb-2">Impact Highlight</h4>
                        <p className="text-purple-800 text-sm">{prog.impact}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};