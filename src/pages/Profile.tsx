import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Phone, Mail, Calendar, Briefcase, LogOut, Edit, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

// Données simulées pour l'utilisateur
const userData = {
  nom: 'Dupont',
  prenoms: 'Jean Marie',
  telephone: '0123456789',
  email: 'jean.dupont@email.com',
  dateNaissance: '1985-03-15',
  profession: 'Ingénieur',
  sexe: 'Masculin'
};

// Données simulées pour l'historique des rendez-vous
const appointmentHistory = [
  {
    id: 1,
    date: '2024-01-15',
    heure: '09:00',
    medecin: 'Dr. Martin',
    specialite: 'Cardiologie',
    statut: 'terminé',
    motif: 'Consultation de routine'
  },
  {
    id: 2,
    date: '2024-02-10',
    heure: '14:30',
    medecin: 'Dr. Dubois',
    specialite: 'Dermatologie',
    statut: 'terminé',
    motif: 'Examen de la peau'
  },
  {
    id: 3,
    date: '2024-03-05',
    heure: '11:00',
    medecin: 'Dr. Bernard',
    specialite: 'Ophtalmologie',
    statut: 'annulé',
    motif: 'Contrôle de la vue'
  },
  {
    id: 4,
    date: '2024-03-20',
    heure: '16:00',
    medecin: 'Dr. Martin',
    specialite: 'Cardiologie',
    statut: 'confirmé',
    motif: 'Suivi cardiologique'
  },
  {
    id: 5,
    date: '2024-04-02',
    heure: '10:30',
    medecin: 'Dr. Lefevre',
    specialite: 'Médecine générale',
    statut: 'en_attente',
    motif: 'Consultation générale'
  }
];

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case 'terminé':
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Terminé</Badge>;
    case 'confirmé':
      return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Confirmé</Badge>;
    case 'en_attente':
      return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
    case 'annulé':
      return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Annulé</Badge>;
    default:
      return <Badge>{statut}</Badge>;
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulation de déconnexion
    console.log('Déconnexion');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-clinic-light">
      <Navbar />
      
      <main className="pt-24 pb-16">
         <div className="container mx-auto px-4">

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentHistory.filter(a => a.statut === 'terminé').length}
                  </p>
                  <p className="text-sm text-gray-600">RDV terminés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentHistory.filter(a => a.statut === 'confirmé').length}
                  </p>
                  <p className="text-sm text-gray-600">RDV confirmés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentHistory.filter(a => a.statut === 'en_attente').length}
                  </p>
                  <p className="text-sm text-gray-600">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appointmentHistory.filter(a => a.statut === 'annulé').length}
                  </p>
                  <p className="text-sm text-gray-600">RDV annulés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
                   
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* Informations personnelles */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Informations personnelles</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Nom complet</p>
                    <p className="font-medium">{userData.prenoms} {userData.nom}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{userData.telephone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Date de naissance</p>
                    <p className="font-medium">{new Date(userData.dateNaissance).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-600">Profession</p>
                    <p className="font-medium">{userData.profession}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="text-sm text-gray-600">Sexe</p>
                    <p className="font-medium">{userData.sexe}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Historique des rendez-vous */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Historique des rendez-vous</CardTitle>
               
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Médecin</TableHead>
                      <TableHead>Spécialité</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointmentHistory.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          {new Date(appointment.date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>{appointment.heure}</TableCell>
                        <TableCell>{appointment.medecin}</TableCell>
                        <TableCell>{appointment.specialite}</TableCell>
                        <TableCell>{appointment.motif}</TableCell>
                        <TableCell>{getStatusBadge(appointment.statut)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>


         </div>

       
      </main>
    </div>
    
  );
};

export default ProfilePage;