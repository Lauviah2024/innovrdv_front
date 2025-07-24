
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { PersistentStorage, StorageKeys } from '@/utils';

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
    { name: 'Prendre rendez-vous', path: '/' },
    { name: 'Accueil', path: 'https://cliniquelanoel.org/' },
    
    
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
          className="flex items-center gap-2 font-heading font-bold text-2xl text-[#e83e8c] transition-opacity duration-200 hover:opacity-80"
        >
          <span className="text-[#e83e8c]">InnovRDV</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-medium text-sm transition-all duration-200 hover:text-[#e83e8c] relative py-2',
                isActive(link.path) 
                  ? 'text-[#e83e8c] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#e83e8c] after:rounded-full' 
                  : 'text-clinic-dark/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">

          {
             !PersistentStorage.getData(
                StorageKeys.INNOV_TOKEN_KEY
              ) ?  (
 <Link
            to="/auth/login"
            className="px-6 py-2 border border-[#e83e8c] text-[#e83e8c] rounded-full shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]"
          >
            Se connecter
          </Link>
              ):(
                 <div
            onClick={()=> {
              localStorage.removeItem('_INNOV_TOKEN');
              window.location.href= '/'
            }}
            className="px-6 py-2 border cursor-pointer rounded-full shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]"
          >
            Se déconnecter
          </div>
              )
          }
         
         
         
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
                    ? 'bg-clinic-secondary text-[#e83e8c]' 
                    : 'text-clinic-dark hover:bg-gray-50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointment"
              className="py-3 px-4 bg-[#e83e8c] text-white rounded-lg font-medium shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prendre rendez-vous
            </Link>
            <Link
            to="/auth/login"
            className="px-6 py-2 border border-[#e83e8c] text-[#e83e8c] rounded-full shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]"
          >
            Se connecter
          </Link>
         
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
