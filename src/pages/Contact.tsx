import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Users, Car, Bus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Données des contacts de la clinique
const clinicContacts = [
  {
    id: 1,
    nom: 'Dr. Sarah Martin',
    poste: 'Directrice Médicale',
    specialite: 'Cardiologie',
    telephone: '01 23 45 67 80',
    email: 'dr.martin@innovrdv.fr',
    horaires: 'Lun-Ven: 8h-18h'
  },
  {
    id: 2,
    nom: 'Dr. Pierre Dubois',
    poste: 'Chef de Service',
    specialite: 'Dermatologie',
    telephone: '01 23 45 67 81',
    email: 'dr.dubois@innovrdv.fr',
    horaires: 'Mar-Sam: 9h-17h'
  },
  {
    id: 3,
    nom: 'Mme Sophie Bernard',
    poste: 'Secrétaire Médicale',
    specialite: 'Accueil & RDV',
    telephone: '01 23 45 67 89',
    email: 'accueil@innovrdv.fr',
    horaires: 'Lun-Ven: 7h30-19h'
  },
  {
    id: 4,
    nom: 'Dr. Antoine Lefevre',
    poste: 'Médecin Généraliste',
    specialite: 'Médecine Générale',
    telephone: '01 23 45 67 82',
    email: 'dr.lefevre@innovrdv.fr',
    horaires: 'Lun-Ven: 8h-16h'
  }
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#e83e8c] mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe médicale est à votre disposition pour répondre à toutes vos questions 
            et vous accompagner dans vos démarches de santé.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Informations générales */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-6 w-6 text-[#e83e8c]" />
                  <span>Informations générales</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#e83e8c] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">123 Rue de la Santé<br />75014 Paris, France</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone principal</h3>
                    <p className="text-gray-600">01 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-purple-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@innovrdv.fr</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Horaires d'ouverture</h3>
                    <div className="text-gray-600">
                      <p>Lundi - Vendredi: 7h30 - 19h00</p>
                      <p>Samedi: 8h00 - 17h00</p>
                      <p>Dimanche: Fermé</p>
                      <p className="text-red-600 font-medium mt-2">Urgences 24h/7j: 15</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>

          {/* Carte de localisation */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Carte simulée - en production, utiliser une vraie carte */}
                  <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <div className="text-center z-10">
                      <MapPin className="h-16 w-16 text-[#e83e8c] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Clinique Innov RDV</h3>
                      <p className="text-gray-600">123 Rue de la Santé, 75014 Paris</p>
                      <Button className="mt-4" onClick={() => window.open('https://maps.google.com/?q=123+Rue+de+la+Santé+75014+Paris', '_blank')}>
                        Ouvrir dans Google Maps
                      </Button>
                    </div>
                    {/* Éléments décoratifs pour simuler une carte */}
                    <div className="absolute top-4 left-4 w-20 h-20 bg-green-200 rounded-full opacity-50"></div>
                    <div className="absolute bottom-8 right-6 w-16 h-16 bg-blue-200 rounded-full opacity-40"></div>
                    <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-60"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Liste des contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-[#e83e8c]" />
              <span>Notre équipe médicale</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clinicContacts.map((contact) => (
                <div key={contact.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#e83e8c] to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">{contact.nom}</h3>
                    <p className="text-[#e83e8c] font-medium">{contact.poste}</p>
                    <p className="text-gray-600 text-sm">{contact.specialite}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{contact.telephone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-600">{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{contact.horaires}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button variant="secondary" size="sm" className="w-full bg-[#e83e8c] text-white hover:text-black">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                    <Button variant="secondary"  size="sm" className="w-full bg-[#e83e8c] text-white hover:text-black">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

     
      </div>
      
      {/* Footer */}
    <Footer/>
    </div>
  );
};

export default ContactPage;