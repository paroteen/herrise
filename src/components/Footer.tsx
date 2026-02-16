import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ArrowUp, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Subtle divider between contact section and footer */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <footer className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-slate-300 overflow-hidden">
        {/* Background mesh gradient continuation */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute -bottom-1/2 -left-1/4 w-3/4 h-3/4 bg-gradient-to-tr from-purple-600/20 via-transparent to-transparent blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl from-pink-600/20 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Brand/Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white mb-6">
                <div className="bg-purple-600 p-1.5 rounded-full">
                  <HeartHandshake size={20} />
                </div>
                <span className="font-bold text-xl tracking-tight">HerRise</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Empowering women and girls across Uganda to build sustainable livelihoods, lead healthy lives, and participate in decision-making.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Navigate</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/programmes" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Our Programmes
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/impact-stories" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Impact Stories
                  </Link>
                </li>
                <li>
                  <Link to="/get-involved" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Get Involved
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-all inline-block hover:translate-x-1">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Socials */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:text-white transition-all hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:text-white transition-all hover:-translate-y-1"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 hover:text-white transition-all hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-6">
                Follow us for updates on our impact and programs.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 mt-8 text-center">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} HerRise Development Organisation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all hover:-translate-y-1 z-50"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};
