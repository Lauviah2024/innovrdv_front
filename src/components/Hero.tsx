
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, UserCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-clinic-secondary via-white to-clinic-light z-[-1]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-clinic-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-clinic-primary/10 rounded-full blur-3xl" />
      
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:pr-12 space-y-8 animate-fade-in-up">
            <div>
              <div className="inline-block py-1 px-3 mb-5 bg-clinic-secondary text-[#e83e8c] rounded-full text-sm font-medium tracking-wide animate-fade-in">
                Votre santé, notre priorité
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-clinic-dark mb-4">
                Réservez votre <span className="text-[#e83e8c]">rendez-vous médical</span> en quelques clics
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Prenez rendez-vous avec nos spécialistes qualifiés et recevez des soins exceptionnels, sans attente.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/appointment" 
                className="px-8 py-3 bg-[#e83e8c] text-white rounded-xl shadow-button transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px] text-center font-medium"
              >
                Prendre rendez-vous
              </Link>
              <Link 
                to="/doctors" 
                className="px-8 py-3 bg-white border border-gray-200 text-clinic-dark rounded-xl shadow-soft hover:shadow-md transition-all duration-300 text-center font-medium"
              >
                Nos médecins
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-clinic-secondary flex items-center justify-center text-[#e83e8c]">
                  <Calendar size={18} />
                </div>
                <span className="text-sm text-gray-600">Réservation facile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-clinic-secondary flex items-center justify-center text-[#e83e8c]">
                  <Clock size={18} />
                </div>
                <span className="text-sm text-gray-600">Sans attente</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-clinic-secondary flex items-center justify-center text-[#e83e8c]">
                  <UserCheck size={18} />
                </div>
                <span className="text-sm text-gray-600">Médecins experts</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="glass-effect rounded-2xl overflow-hidden shadow-glass p-6 md:p-8 relative z-10 transform transition-transform hover:scale-[1.01] duration-500">
              <img 
                src="/doctor-2.jpg" 
                width={100}
                height={100}
                alt="Clinique Médicale" 
                className="w-full h-auto rounded-lg object-cover shadow-sm" 
              />
              
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-clinic-dark">Clinique Moderne & Accueillante</h3>
                <p className="text-sm text-gray-600">
                  Notre clinique offre un environnement confortable et des équipements à la pointe de la technologie pour tous vos besoins médicaux.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-medium text-[#e83e8c]">Plus de 30 spécialités médicales</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-[#e83e8c] rounded-full opacity-20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#e83e8c] rounded-full opacity-10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
