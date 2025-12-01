import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success');
        }, 1500);
    };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-teal-800 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-teal-200 max-w-2xl mx-auto px-4">
          Have questions, suggestions, or want to partner? We would love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                    <p className="text-gray-600 mb-8">
                        Our team is available to answer your inquiries.
                    </p>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Head Office</h3>
                        <p className="text-gray-600">5 Close, Muyenga</p>
                        <p className="text-gray-600">Kampala, Uganda</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Key Contacts</h3>
                        <div className="mb-2">
                             <p className="text-gray-700 font-semibold text-sm">Primrose Kibirigi (Executive Director)</p>
                             <p className="text-gray-600">+256 700 349 144</p>
                        </div>
                        <div>
                             <p className="text-gray-700 font-semibold text-sm">Sarah Nyesigire (Programs Director)</p>
                             <p className="text-gray-600">+256 786 153 027</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Email</h3>
                        <p className="text-gray-600">primrosekibirigi@gmail.com</p>
                        <p className="text-gray-600">Sarahnyesigire1@gmail.com</p>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 h-64 rounded-xl w-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                        <MapPin size={40} className="mx-auto mb-2 opacity-50"/>
                        <span>Google Map Integration Placeholder</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                {formStatus === 'success' ? (
                    <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center">
                        <h3 className="font-bold text-xl mb-2">Thank You!</h3>
                        <p>Your message has been received. We will get back to you shortly.</p>
                        <button 
                            onClick={() => setFormStatus('idle')}
                            className="mt-4 text-green-700 underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none">
                                <option>General Inquiry</option>
                                <option>Partnership Proposal</option>
                                <option>Volunteer Application</option>
                                <option>Media/Press</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={formStatus === 'submitting'}
                            className="w-full bg-purple-700 text-white font-bold py-3 rounded-md hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
                        >
                            {formStatus === 'submitting' ? 'Sending...' : (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};