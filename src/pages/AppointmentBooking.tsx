
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, CalendarCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '@/components/Footer';

// Reusing the mock data from the Doctors page
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

// Steps for the booking process
const steps = [
  { id: 1, name: 'Sélection du médecin' },
  { id: 2, name: 'Date et heure' },
  { id: 3, name: 'Informations personnelles' },
  { id: 4, name: 'Confirmation' }
];

const AppointmentBooking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctorsMockData[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: ''
  });

  // Load pre-selected doctor from URL params
  useEffect(() => {
    const doctorId = searchParams.get('doctor');
    if (doctorId) {
      const doctor = doctorsMockData.find(d => d.id === doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
        setCurrentStep(2);
      }
    }
  }, [searchParams]);

  const handleDoctorSelect = (doctor: typeof doctorsMockData[0]) => {
    setSelectedDoctor(doctor);
    setCurrentStep(2);
  };

  const handleDateTimeSelect = (date: Date | undefined, time: string | undefined) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/confirmation', { 
      state: { 
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
        patient: formData
      } 
    });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return selectedDoctor !== null;
      case 2:
        return selectedDate !== undefined && selectedTime !== undefined;
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-clinic-light">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 max-w-2xl mx-auto animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-[#e83e8c] mb-4">Prendre rendez-vous</h1>
            <p className="text-gray-600">
              Réservez votre créneau en quelques étapes simples
            </p>
          </div>
          
          {/* Stepper */}
          <div className="mb-8">
            <div className="hidden sm:flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id 
                        ? 'bg-[#e83e8c] text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}
                    </div>
                    <div className="text-xs mt-2 text-gray-600">{step.name}</div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-[#e83e8c]' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Mobile stepper display */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                <button 
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1}
                  className={`p-2 ${currentStep === 1 ? 'text-gray-300' : 'text-[#e83e8c]'}`}
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="text-center">
                  <div className="text-sm font-medium">Étape {currentStep} sur {steps.length}</div>
                  <div className="text-xs text-gray-500">{steps[currentStep - 1].name}</div>
                </div>
                <div className="w-8"></div> {/* Placeholder for visual balance */}
              </div>
            </div>
          </div>
          
          {/* Step content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Doctor Selection */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-soft p-6 animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-4">Choisissez un médecin</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {doctorsMockData.map((doctor) => (
                    <div 
                      key={doctor.id}
                      className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${
                        selectedDoctor?.id === doctor.id 
                          ? 'border-[#e83e8c] bg-clinic-secondary' 
                          : 'border-gray-200 hover:border-[#e83e8c]'
                      }`}
                      onClick={() => handleDoctorSelect(doctor)}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={doctor.imageUrl}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.specialty}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 2: Date and Time Selection */}
            {currentStep === 2 && selectedDoctor && (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Médecin sélectionné</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDoctor.imageUrl}
                      alt={selectedDoctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-lg">{selectedDoctor.name}</div>
                      <div className="text-gray-500">{selectedDoctor.specialty}</div>
                    </div>
                    <button 
                      className="ml-auto text-[#e83e8c] hover:underline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
                
                <AppointmentCalendar onSelectDateTime={handleDateTimeSelect} />
                
                <div className="mt-6 flex justify-between">
                  <button 
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    onClick={goToPreviousStep}
                  >
                    Précédent
                  </button>
                  <button 
                    className={`px-6 py-2 bg-[#e83e8c] text-white rounded-lg shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px] ${
                      !isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={goToNextStep}
                    disabled={!isStepComplete()}
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Patient Information */}
            {currentStep === 3 && (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            name="firstName"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e83e8c] focus:border-transparent"
                            placeholder="Votre prénom"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            name="lastName"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e83e8c] focus:border-transparent"
                            placeholder="Votre nom"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e83e8c] focus:border-transparent"
                            placeholder="votre.email@exemple.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e83e8c] focus:border-transparent"
                            placeholder="Votre numéro de téléphone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Motif de la consultation</label>
                      <textarea
                        name="reason"
                        rows={4}
                        className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e83e8c] focus:border-transparent"
                        placeholder="Décrivez brièvement la raison de votre visite..."
                        value={formData.reason}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button 
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        onClick={goToPreviousStep}
                      >
                        Précédent
                      </button>
                      <button 
                        type="submit"
                        className={`px-6 py-2 bg-[#e83e8c] text-white rounded-lg shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px] ${
                          !isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!isStepComplete()}
                      >
                        Continuer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && selectedDoctor && selectedDate && selectedTime && (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-xl font-semibold mb-4">Confirmer votre rendez-vous</h2>
                  
                  <div className="bg-clinic-secondary rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={selectedDoctor.imageUrl}
                        alt={selectedDoctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-lg">{selectedDoctor.name}</div>
                        <div className="text-gray-600">{selectedDoctor.specialty}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarCheck size={18} className="text-[#e83e8c]" />
                      <span className="text-clinic-dark">
                        {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })} à {selectedTime}
                      </span>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <div>Patient: {formData.firstName} {formData.lastName}</div>
                      <div>Email: {formData.email}</div>
                      <div>Téléphone: {formData.phone}</div>
                      {formData.reason && (
                        <div className="mt-2">
                          <div className="font-medium">Motif:</div>
                          <p>{formData.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h3 className="font-medium mb-2">Informations importantes:</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-[#e83e8c] mt-0.5 flex-shrink-0" />
                        <span>Veuillez arriver 15 minutes avant l'heure de votre rendez-vous.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-[#e83e8c] mt-0.5 flex-shrink-0" />
                        <span>Apportez votre carte d'assurance maladie et toute ordonnance médicale pertinente.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-[#e83e8c] mt-0.5 flex-shrink-0" />
                        <span>En cas d'empêchement, veuillez annuler votre rendez-vous au moins 24 heures à l'avance.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <button 
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={goToPreviousStep}
                    >
                      Précédent
                    </button>
                    <button 
                      className="px-8 py-3 bg-[#e83e8c] text-white rounded-lg shadow-button transform transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px] font-medium"
                      onClick={handleSubmit}
                    >
                      Confirmer le rendez-vous
                    </button>
                  </div>
                </div>
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

export default AppointmentBooking;
