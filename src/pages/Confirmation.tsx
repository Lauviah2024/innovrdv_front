
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Calendar, CheckCircle, HomeIcon, ArrowRight, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from location state
  const appointmentData = location.state || null;
  
  // Redirect to home if no appointment data exists
  useEffect(() => {
    if (!appointmentData) {
      navigate('/');
    }
  }, [appointmentData, navigate]);
  
  // If no data, show loading
  if (!appointmentData) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }
  
  const { doctor, date, time, patient } = appointmentData;
  
  return (
    <div className="min-h-screen bg-clinic-light">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-clinic-dark mb-2">Rendez-vous confirmé</h1>
              <p className="text-gray-600">
                Votre rendez-vous a été réservé avec succès
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft overflow-hidden animate-scale-in">
              {/* Confirmation Header */}
              <div className="bg-clinic-primary text-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Détails du rendez-vous</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-white/70 text-sm mb-1">Médecin</div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-white/90">{doctor.specialty}</div>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-1">Date et heure</div>
                    <div className="font-medium">
                      {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
                    </div>
                    <div className="text-sm text-white/90">à {time}</div>
                  </div>
                </div>
              </div>
              
              {/* Confirmation Content */}
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="font-medium mb-3">Patient</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Nom</div>
                      <div>{patient.firstName} {patient.lastName}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Email</div>
                      <div>{patient.email}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Téléphone</div>
                      <div>{patient.phone}</div>
                    </div>
                    {patient.reason && (
                      <div className="md:col-span-2">
                        <div className="text-gray-500 mb-1">Motif de consultation</div>
                        <div>{patient.reason}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Location Info */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="font-medium mb-3">Lieu du rendez-vous</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-medium mb-1">Clinique Médicale ClinicRDV</div>
                    <div className="text-sm text-gray-600 mb-3">
                      123 Avenue de la Santé, 75001 Paris
                    </div>
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-clinic-primary hover:underline"
                      >
                        <HomeIcon className="w-4 h-4" />
                        <span>Voir sur la carte</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                      <a 
                        href="tel:+33123456789" 
                        className="flex items-center gap-1 text-sm text-clinic-primary hover:underline"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Appeler la clinique</span>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Instructions */}
                <div>
                  <h3 className="font-medium mb-3">Rappels importants</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-clinic-secondary text-clinic-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <span>Arrivez 15 minutes avant l'heure de votre rendez-vous pour les formalités administratives.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-clinic-secondary text-clinic-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <span>Apportez votre carte d'assurance maladie et toute ordonnance médicale pertinente.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-clinic-secondary text-clinic-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <span>Si vous ne pouvez pas vous présenter, veuillez annuler votre rendez-vous au moins 24 heures à l'avance.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Footer Actions */}
              <div className="bg-gray-50 p-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Vous recevrez un email de confirmation à {patient.email} avec tous les détails de votre rendez-vous.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/"
                      className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
                    >
                      Retour à l'accueil
                    </Link>
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2 bg-clinic-primary text-white rounded-lg shadow-sm hover:shadow-button transition-all duration-300 text-center"
                    >
                      Imprimer la confirmation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 font-heading font-bold text-2xl mb-4">
              <span className="text-clinic-primary">Clinic</span>
              <span className="text-clinic-accent">RDV</span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ClinicRDV - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Confirmation;
