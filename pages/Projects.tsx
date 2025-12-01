import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Project } from '../types';

const currentProjects: Project[] = [
  {
    title: "Rural Women's Livelihood Initiative",
    timeline: "2023 - 2025",
    status: "In Progress",
    focusArea: "Economic Empowerment",
    description: "Strengthening our 30 existing VSLAs (300 members) with financial literacy and seed capital links."
  },
  {
    title: "Safe Schools for Girls",
    timeline: "2024 - 2026",
    status: "In Progress",
    focusArea: "Education & GBV",
    description: "Supporting vulnerable girls with scholastic materials and mentorship in partner schools."
  },
  {
    title: "Maternal Health Access Project",
    timeline: "2022 - 2024",
    status: "Completed",
    focusArea: "Health",
    description: "Facilitated community health dialogues and referrals for antenatal care."
  },
  {
    title: "Youth Leadership Academy Phase II",
    timeline: "2025 - 2027",
    status: "Planned",
    focusArea: "Leadership",
    description: "Scaling up our leadership curriculum to reach more young women in our districts of operation."
  }
];

export const Projects: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-purple-800 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Projects & Workplan</h1>
        <p className="text-purple-200 max-w-2xl mx-auto px-4">
          A transparent look at our ongoing activities, future plans, and completed milestones.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentProjects.map((project, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                project.status === 'In Progress' ? 'bg-green-100 text-green-800' :
                                project.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                                {project.status}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">{project.focusArea}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{project.timeline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={16} />
                                <span>Uganda</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Annual Workplan Visual (Simple Timeline) */}
        <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">2025 Strategic Roadmap</h2>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 flex-shrink-0">
                        <span className="font-bold text-purple-700 text-lg">Q1</span>
                        <span className="block text-sm text-gray-500">Jan - Mar</span>
                    </div>
                    <div className="flex-grow bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
                        <h4 className="font-bold">Programme Launch & Mobilization</h4>
                        <p className="text-sm text-gray-600">Community entry meetings, beneficiary selection for new livelihood cohorts, and school partnership renewals.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 flex-shrink-0">
                        <span className="font-bold text-purple-700 text-lg">Q2</span>
                        <span className="block text-sm text-gray-500">Apr - Jun</span>
                    </div>
                    <div className="flex-grow bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
                        <h4 className="font-bold">Training & Capacity Building</h4>
                        <p className="text-sm text-gray-600">Intensive vocational skills workshops, health camps, and teacher training sessions.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 flex-shrink-0">
                        <span className="font-bold text-purple-700 text-lg">Q3</span>
                        <span className="block text-sm text-gray-500">Jul - Sep</span>
                    </div>
                    <div className="flex-grow bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
                        <h4 className="font-bold">Distribution & Implementation</h4>
                        <p className="text-sm text-gray-600">Disbursement of seed grants, distribution of scholastic materials, and mid-year review.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 flex-shrink-0">
                        <span className="font-bold text-purple-700 text-lg">Q4</span>
                        <span className="block text-sm text-gray-500">Oct - Dec</span>
                    </div>
                    <div className="flex-grow bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
                        <h4 className="font-bold">Evaluation & Reporting</h4>
                        <p className="text-sm text-gray-600">End-line surveys, stakeholder feedback meetings, and annual impact reporting.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};