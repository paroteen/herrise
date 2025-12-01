import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Activity, ClipboardCheck, Database } from 'lucide-react';

const impactData = [
  { name: '2020', beneficiaries: 30 },
  { name: '2021', beneficiaries: 80 },
  { name: '2022', beneficiaries: 150 },
  { name: '2023', beneficiaries: 220 },
  { name: '2024', beneficiaries: 300 },
];

const fundingData = [
  { name: 'Economic Prog', value: 40 },
  { name: 'Health', value: 25 },
  { name: 'Education', value: 20 },
  { name: 'Advocacy', value: 15 },
];

const COLORS = ['#7e22ce', '#0d9488', '#eab308', '#64748b'];

export const MonitoringEvaluation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-slate-900 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Monitoring & Evaluation</h1>
        <p className="text-slate-300 max-w-2xl mx-auto px-4">
          We are committed to data-driven impact. Our M&E systems ensure accountability, transparency, and continuous learning.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-slate-50 rounded-lg">
                <Database className="mx-auto text-teal-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Data Collection</h3>
                <p className="text-sm text-gray-600">We use digital tools (ODK) for real-time field data collection to ensure accuracy.</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
                <Activity className="mx-auto text-teal-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Tracking Indicators</h3>
                <p className="text-sm text-gray-600">We monitor key performance indicators (KPIs) aligned with SDGs 1, 3, 4, and 5.</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-lg">
                <ClipboardCheck className="mx-auto text-teal-600 mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Reporting</h3>
                <p className="text-sm text-gray-600">Quarterly and annual reports are shared with all stakeholders to show progress.</p>
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            
            <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Beneficiary Growth (Cumulative)</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={impactData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="beneficiaries" fill="#7e22ce" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Programmatic Focus</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={fundingData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {fundingData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>

        <div className="bg-purple-50 p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold text-purple-900 mb-2">Download Our Latest Annual Report</h3>
            <p className="text-purple-700 mb-4">Get the full details on our financial health and programme outcomes.</p>
            <button className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-colors">
                Download PDF (2.4MB)
            </button>
        </div>

      </div>
    </div>
  );
};