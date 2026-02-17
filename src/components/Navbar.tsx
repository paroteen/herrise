import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavItem } from '@/types';
import { openIremboPay } from '@/services/iremboPay';
import DonationModal from './DonationModal';

interface DropdownItem {
  label: string;
  path: string;
}

interface NavMenuItem {
  label: string;
  path?: string;
  items?: DropdownItem[];
}

const navMenuItems: NavMenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  {
    label: 'Our Work',
    items: [
      { label: 'Programmes', path: '/programmes' },
      { label: 'Projects', path: '/projects' },
      { label: 'M & E', path: '/monitoring-evaluation' },
    ],
  },
  { label: 'Impact Stories', path: '/impact-stories' },
  { label: 'She Stories', path: '/she-stories' },
  {
    label: 'Get Involved',
    items: [
      { label: 'Partnerships', path: '/partnerships' },
      { label: 'Contact', path: '/contact' },
    ],
  },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close donation modal and mobile menu when navigating to another page
  useEffect(() => {
    setIsDonationModalOpen(false);
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDonationModalOpen(true);
  };

  const handleDonate = (amount: number, _paymentMethod: string, email: string, name: string, phone?: string) => {
    setIsDonationModalOpen(false);
    openIremboPay({
      amount,
      customerEmail: email,
      customerPhone: phone,
      description: `Donation to HerRise from ${name}`,
    });
    alert(`Thank you! You will complete your RWF ${amount.toLocaleString()} donation in the payment window.`);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isPathActive = (paths: string | string[]): boolean => {
    if (typeof paths === 'string') {
      return location.pathname === paths;
    }
    return paths.some((path) => location.pathname === path);
  };

  const getDropdownPaths = (items?: DropdownItem[]): string[] => {
    return items?.map((item) => item.path) || [];
  };

  return (
    <>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        onDonate={handleDonate}
      />
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/50'
            : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <NavLink to="/" className="flex-shrink-0">
                <img
                  src="/images/herriseLogo.png"
                  alt="HerRise Initiative"
                  className="h-16 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://via.placeholder.com/150x50?text=HerRise+Logo';
                  }}
                />
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 tracking-wide">
              {navMenuItems.map((item) => {
                if (item.items) {
                  // Dropdown menu
                  const isActive = isPathActive(getDropdownPaths(item.items));
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      ref={(el) => (dropdownRefs.current[item.label] = el)}
                    >
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 rounded-md hover:bg-slate-50 ${
                          isActive
                            ? 'text-slate-900 font-semibold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                          {item.items.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) =>
                                `block px-6 py-3 text-sm font-medium transition-all duration-150 ${
                                  isActive
                                    ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-600'
                                    : 'text-slate-700 hover:text-purple-700 hover:bg-slate-50 border-l-4 border-transparent'
                                }`
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else if (
                  item.path === '/impact-stories' ||
                  item.path === '/she-stories'
                ) {
                  // Stories - Distinct styling to highlight field work
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `relative px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 group rounded-md ${
                          isActive ? 'text-purple-700' : 'text-slate-700 hover:text-purple-700'
                        }`
                      }
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span
                        className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </NavLink>
                  );
                } else {
                  // Regular link (Home, About Us)
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200 rounded-md hover:bg-slate-50 ${
                          isActive
                            ? 'text-slate-900 font-semibold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                }
              })}
              <button
                onClick={handleDonateClick}
                className="ml-3 px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold uppercase text-sm tracking-wider rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5"
              >
                Donate
              </button>
            </div>
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
          <div className="lg:hidden bg-white border-t border-slate-200">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navMenuItems.map((item) => {
                if (item.items) {
                  // Accordion dropdown for mobile
                  const isExpanded = openDropdown === item.label;
                  const isActive = isPathActive(getDropdownPaths(item.items));
                  return (
                    <div key={item.label} className="space-y-1">
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-all rounded-lg ${
                          isActive
                            ? 'text-purple-700 bg-purple-50'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="pl-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                          {item.items.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive }) =>
                                `block pl-6 pr-4 py-2.5 text-sm font-medium transition-all rounded-lg ${
                                  isActive
                                    ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-600'
                                    : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50 border-l-4 border-transparent'
                                }`
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                } else if (
                  item.path === '/impact-stories' ||
                  item.path === '/she-stories'
                ) {
                  // Stories links with emphasis
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all rounded-lg border-l-4 ${
                          isActive
                            ? 'text-purple-700 bg-purple-50 border-purple-600'
                            : 'text-slate-700 hover:text-purple-700 hover:bg-slate-50 border-transparent'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                } else {
                  // Regular links
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-all rounded-lg ${
                          isActive
                            ? 'text-purple-700 bg-purple-50'
                            : 'text-slate-700 hover:text-purple-700 hover:bg-slate-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                }
              })}
              <button
                onClick={(e) => {
                  setIsOpen(false);
                  handleDonateClick(e);
                }}
                className="block w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold uppercase text-sm tracking-wider rounded-xl shadow-xl transition-all duration-300"
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
