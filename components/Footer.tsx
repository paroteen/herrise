import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-white">
                <div className="bg-purple-600 p-1.5 rounded-full">
                  <HeartHandshake size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight">
                  HerRise
                </span>
              </div>
            <p className="text-sm leading-relaxed">
              Empowering women and girls across Uganda to build sustainable livelihoods, lead healthy lives, and participate in decision-making.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link to="/programmes" className="hover:text-purple-400 transition-colors">Our Programmes</Link></li>
              <li><Link to="/projects" className="hover:text-purple-400 transition-colors">Projects</Link></li>
              <li><Link to="/partnerships" className="hover:text-purple-400 transition-colors">Partnerships</Link></li>
              <li><Link to="/get-involved" className="hover:text-purple-400 transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="text-white font-semibold mb-4">Key Areas</h3>
            <ul className="space-y-2 text-sm">
              <li>Economic Empowerment</li>
              <li>Health Support</li>
              <li>GBV Prevention</li>
              <li>Education</li>
              <li>Leadership</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-purple-400" />
                <span>5 Close, Muyenga<br />Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-purple-400" />
                <span>+256 700 349 144</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-purple-400" />
                <span>primrosekibirigi@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} HerRise Development Organisation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};