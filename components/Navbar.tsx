import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { NavItem } from '../types';
import DonationModal from './DonationModal';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Programmes', path: '/programmes' },
  { label: 'Projects', path: '/projects' },
  { label: 'Impact Stories', path: '/impact-stories' },
  { label: 'M & E', path: '/monitoring-evaluation' },
  { label: 'Partnerships', path: '/partnerships' },
  { label: 'Get Involved', path: '/get-involved' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDonationModalOpen(true);
  };

  const handleDonate = (amount: number, paymentMethod: string, email: string, name: string) => {
    console.log(`Donation of RWF ${amount} from ${name} (${email}) via ${paymentMethod}`);
    // Here you can integrate with your payment processor
    // For now, we'll just log the donation and close the modal
    setIsDonationModalOpen(false);
    
    // Show a success message or redirect to a thank you page
    alert(`Thank you for your donation of RWF ${amount.toLocaleString()}!`);
  };

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive
        ? 'text-teal-700 bg-teal-50'
        : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
    }`;
  };

  return (
    <>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonate={handleDonate}
      />
      <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0">
              <img 
                src="/images/logo.jpeg" 
                alt="HerRise Initiative" 
                className="h-20 w-auto"
                onError={(e) => {
                  // Fallback in case the image fails to load
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://via.placeholder.com/150x50?text=HerRise+Logo';
                }}
              />
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-purple-700 font-bold bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={handleDonateClick}
              className="ml-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition-colors shadow-sm"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => getLinkClass(item.path)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
                onClick={(e) => {
                  setIsOpen(false);
                  handleDonateClick(e);
                }}
                className="block w-full text-center mt-4 px-4 py-3 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition-colors"
            >
                Donate Now
            </button>
          </div>
        </div>
      )}
      </nav>
    </>
  );
};