import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button';

interface NavbarProps {
  onRegisterClick: () => void;
  onEnrollClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick, onEnrollClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-[#0a585b]/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="h-10 w-10 bg-[#0a585b] rounded-xl flex items-center justify-center text-white font-bold text-xl animate-pulse">
            AP
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-wider text-[#0a585b] leading-none">ALPHAPRIME</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#0f766e] font-medium mt-1">Learn · Trade · Grow</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Courses', 'Blog', 'Career', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[#0a585b] font-medium hover:text-[#0f766e] transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0a585b] transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <Button variant="outline" onClick={onEnrollClick}>Enroll Now</Button>
          <Button onClick={onRegisterClick}>Register</Button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden relative">
          <Button 
            variant="primary" 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 !px-4"
          >
            Menu
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-[#0a585b]/10 p-2 flex flex-col gap-1 animate-fade-in origin-top-right">
               {['Home', 'Courses', 'Blog', 'Career', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#0a585b] hover:text-white transition-colors text-[#0a585b] font-medium"
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-gray-100 my-1"></div>
              <button onClick={onEnrollClick} className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#0a585b] hover:text-white transition-colors text-[#0a585b] font-medium">
                Enroll Now
              </button>
              <button onClick={onRegisterClick} className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#0a585b] hover:text-white transition-colors text-[#0a585b] font-medium">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};