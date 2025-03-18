
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Médecins', path: '/doctors' },
    { name: 'Rendez-vous', path: '/appointment' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-heading font-bold text-2xl text-clinic-accent transition-opacity duration-200 hover:opacity-80"
        >
          <span className="text-clinic-primary">Clinic</span>RDV
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-medium text-sm transition-all duration-200 hover:text-clinic-primary relative py-2',
                isActive(link.path) 
                  ? 'text-clinic-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-clinic-primary after:rounded-full' 
                  : 'text-clinic-dark/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/appointment"
            className="px-6 py-2 bg-clinic-primary text-white rounded-full shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]"
          >
            Prendre rendez-vous
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-clinic-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in-up">
          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'py-3 px-4 rounded-lg font-medium transition-colors',
                  isActive(link.path) 
                    ? 'bg-clinic-secondary text-clinic-primary' 
                    : 'text-clinic-dark hover:bg-gray-50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointment"
              className="py-3 px-4 bg-clinic-primary text-white rounded-lg font-medium shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
