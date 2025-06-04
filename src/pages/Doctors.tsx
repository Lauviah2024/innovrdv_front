
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Heart, Brain, Stethoscope, Thermometer, User, Clipboard, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import DoctorCard from '@/components/DoctorCard';
import Footer from '@/components/Footer';

// Mock Data
const doctorsMockData = [
  {
    id: '1',
    name: 'Dr. Marie Laurent',
    specialty: 'Cardiologie',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.8,
    reviewCount: 124,
    availability: 'Disponible aujourd\'hui',
    specialtyId: 'cardiology'
  },
  {
    id: '2',
    name: 'Dr. Thomas Dupont',
    specialty: 'Neurologie',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.6,
    reviewCount: 98,
    availability: 'Disponible demain',
    specialtyId: 'neurology'
  },
  {
    id: '3',
    name: 'Dr. Isabelle Moreau',
    specialty: 'Médecine générale',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.9,
    reviewCount: 210,
    availability: 'Disponible aujourd\'hui',
    specialtyId: 'general'
  },
  {
    id: '4',
    name: 'Dr. Philippe Martin',
    specialty: 'Pédiatrie',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.7,
    reviewCount: 156,
    availability: 'Disponible dans 2 jours',
    specialtyId: 'pediatrics'
  },
  {
    id: '5',
    name: 'Dr. Sophie Leroy',
    specialty: 'Dermatologie',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.5,
    reviewCount: 87,
    availability: 'Disponible aujourd\'hui',
    specialtyId: 'dermatology'
  },
  {
    id: '6',
    name: 'Dr. Jean-François Dubois',
    specialty: 'Psychiatrie',
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.7,
    reviewCount: 113,
    availability: 'Disponible demain',
    specialtyId: 'psychiatry'
  },
  {
    id: '7',
    name: 'Dr. Claire Petit',
    specialty: 'Cardiologie',
    imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.6,
    reviewCount: 92,
    availability: 'Disponible dans 3 jours',
    specialtyId: 'cardiology'
  },
  {
    id: '8',
    name: 'Dr. Marc Bernard',
    specialty: 'Médecine générale',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
    rating: 4.9,
    reviewCount: 178,
    availability: 'Disponible aujourd\'hui',
    specialtyId: 'general'
  },
];

const specialties = [
  { 
    id: 'cardiology',
    name: 'Cardiologie', 
    icon: <Heart className="w-5 h-5" />,
    colorClass: 'bg-red-50 text-red-500',
  },
  { 
    id: 'neurology',
    name: 'Neurologie', 
    icon: <Brain className="w-5 h-5" />,
    colorClass: 'bg-purple-50 text-purple-500',
  },
  { 
    id: 'general',
    name: 'Médecine générale', 
    icon: <Stethoscope className="w-5 h-5" />,
    colorClass: 'bg-blue-50 text-blue-500',
  },
  { 
    id: 'pediatrics',
    name: 'Pédiatrie', 
    icon: <Thermometer className="w-5 h-5" />,
    colorClass: 'bg-green-50 text-green-500',
  },
  { 
    id: 'dermatology',
    name: 'Dermatologie', 
    icon: <User className="w-5 h-5" />,
    colorClass: 'bg-amber-50 text-amber-500',
  },
  { 
    id: 'psychiatry',
    name: 'Psychiatrie', 
    icon: <Clipboard className="w-5 h-5" />,
    colorClass: 'bg-indigo-50 text-indigo-500',
  },
];

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    searchParams.get('specialty') || null
  );
  const [showFilters, setShowFilters] = useState(false);

  // Filter doctors based on search text and selected specialty
  const filteredDoctors = doctorsMockData.filter(doctor => {
    const matchesSearch = searchText === '' || 
      doctor.name.toLowerCase().includes(searchText.toLowerCase()) || 
      doctor.specialty.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === null || doctor.specialtyId === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-clinic-light">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-clinic-dark mb-4">Nos médecins spécialistes</h1>
            <p className="text-gray-600">
              Découvrez nos médecins experts et prenez rendez-vous en quelques clics
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-soft p-4 md:p-6 mb-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Rechercher un médecin ou une spécialité..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-clinic-primary focus:border-transparent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              
              <button
                className="md:hidden flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                <span>Filtres</span>
              </button>
            </div>
            
            {/* Specialty Filters - Always visible on desktop, toggleable on mobile */}
            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedSpecialty === null
                      ? 'bg-[#e83e8c] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSpecialty(null)}
                >
                  Tous
                </button>
                
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedSpecialty === specialty.id
                        ? 'bg-[#e83e8c] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedSpecialty(specialty.id)}
                  >
                    <span className={`${selectedSpecialty === specialty.id ? 'text-white' : specialty.colorClass.split(' ')[1]}`}>
                      {specialty.icon}
                    </span>
                    {specialty.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  id={doctor.id}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  imageUrl={doctor.imageUrl}
                  rating={doctor.rating}
                  reviewCount={doctor.reviewCount}
                  availability={doctor.availability}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-gray-500">
                <p className="text-lg">Aucun médecin ne correspond à votre recherche</p>
                <p className="mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
    <Footer/>
    </div>
  );
};

export default Doctors;
