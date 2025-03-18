
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Stethoscope, Thermometer, User, Clipboard } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SpecialtyCard from '@/components/SpecialtyCard';

const specialties = [
  { 
    name: 'Cardiologie', 
    icon: <Heart className="w-5 h-5" />, 
    count: 8,
    colorClass: 'bg-red-50 text-red-500',
    path: '/doctors?specialty=cardiology' 
  },
  { 
    name: 'Neurologie', 
    icon: <Brain className="w-5 h-5" />, 
    count: 5,
    colorClass: 'bg-purple-50 text-purple-500',
    path: '/doctors?specialty=neurology' 
  },
  { 
    name: 'Médecine générale', 
    icon: <Stethoscope className="w-5 h-5" />, 
    count: 12,
    colorClass: 'bg-blue-50 text-blue-500',
    path: '/doctors?specialty=general' 
  },
  { 
    name: 'Pédiatrie', 
    icon: <Thermometer className="w-5 h-5" />, 
    count: 6,
    colorClass: 'bg-green-50 text-green-500',
    path: '/doctors?specialty=pediatrics' 
  },
  { 
    name: 'Dermatologie', 
    icon: <User className="w-5 h-5" />, 
    count: 4,
    colorClass: 'bg-amber-50 text-amber-500',
    path: '/doctors?specialty=dermatology' 
  },
  { 
    name: 'Psychiatrie', 
    icon: <Clipboard className="w-5 h-5" />, 
    count: 7,
    colorClass: 'bg-indigo-50 text-indigo-500',
    path: '/doctors?specialty=psychiatry' 
  },
];

const steps = [
  {
    number: '01',
    title: 'Choisissez votre spécialité',
    description: 'Sélectionnez la spécialité médicale adaptée à vos besoins de santé.'
  },
  {
    number: '02',
    title: 'Sélectionnez un médecin',
    description: 'Consultez les profils de nos médecins et choisissez celui qui vous convient.'
  },
  {
    number: '03',
    title: 'Réservez votre créneau',
    description: 'Sélectionnez date et heure selon les disponibilités du médecin.'
  },
  {
    number: '04',
    title: 'Confirmation immédiate',
    description: 'Recevez une confirmation par email avec tous les détails de votre rendez-vous.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        
        {/* Specialties Section */}
        <section className="py-16 bg-clinic-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-clinic-dark mb-4">Nos spécialités médicales</h2>
              <p className="text-gray-600">
                Consultez nos médecins spécialistes qualifiés pour tous vos besoins de santé
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
              {specialties.map((specialty, index) => (
                <SpecialtyCard
                  key={specialty.name}
                  name={specialty.name}
                  icon={specialty.icon}
                  count={specialty.count}
                  colorClass={specialty.colorClass}
                  path={specialty.path}
                />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link
                to="/doctors"
                className="inline-block px-6 py-3 text-clinic-primary font-medium border border-clinic-primary rounded-lg hover:bg-clinic-secondary transition-colors duration-200"
              >
                Voir toutes les spécialités
              </Link>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-clinic-dark mb-4">Comment ça marche</h2>
              <p className="text-gray-600">
                Prendre rendez-vous n'a jamais été aussi simple
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative animate-fade-in-up">
                  <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-glass border border-gray-100 h-full transition-all duration-300 transform hover:translate-y-[-4px]">
                    <div className="text-3xl font-bold text-clinic-primary mb-4">{step.number}</div>
                    <h3 className="text-xl font-semibold text-clinic-dark mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  
                  {/* Arrow connecting steps - visible on larger screens only */}
                  {parseInt(step.number) < 4 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                to="/appointment"
                className="inline-block px-8 py-3 bg-clinic-primary text-white rounded-xl shadow-button transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[1px] font-medium"
              >
                Prendre rendez-vous maintenant
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer CTA */}
        <section className="bg-clinic-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Besoin d'un rendez-vous rapidement?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Notre plateforme vous permet de trouver un créneau disponible sous 24h avec l'un de nos médecins qualifiés.
            </p>
            <Link
              to="/appointment"
              className="inline-block px-8 py-3 bg-white text-clinic-primary rounded-xl shadow-sm font-medium hover:shadow-lg transition-shadow duration-300"
            >
              Réserver maintenant
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 font-heading font-bold text-2xl mb-6">
                <span className="text-clinic-primary">Clinic</span>
                <span className="text-clinic-accent">RDV</span>
              </div>
              <p className="text-gray-500 text-sm mb-8">
                &copy; {new Date().getFullYear()} ClinicRDV - Tous droits réservés
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
