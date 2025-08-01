
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, CalendarCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '@/components/Footer';
import { AppointmentPayload, useCreateAppointment, useGetDoctorById, useGetSpecialities, useGetSpecialitiesDoctors } from '@/services/appointements';
import { toast } from 'sonner';


// Steps for the booking process
const steps = [
  { id: 1, name: 'Spécialité' },
  { id: 2, name: 'Sélection du médecin' },
  { id: 3, name: 'Date et heure' },
  { id: 4, name: 'Informations personnelles' },
  { id: 5, name: 'Confirmation' }
];



const AppointmentBooking = () => {
  const {data:specialties}=useGetSpecialities();
  console.log(specialties)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof specialtiesDoctor.data[0] | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  const {data: specialtiesDoctor} = useGetSpecialitiesDoctors(selectedSpecialty)

const [formData, setFormData] = useState({
    appointment_user_firstname: '',
    appointment_user_lastname: '',
    appointment_user_gender: 'Masculin',
    appointment_user_birthdate: '',
    appointment_user_job: '',
    appointment_user_phone: '',
    email: '', // Gardé pour la complétude
    appointment_user_notes: '',
    appointment_type: 'myself',
  });

    const { mutateAsync: createAppointment, isPending } = useCreateAppointment();


  // Load pre-selected doctor from URL params
  useEffect(() => {
    const doctorId = searchParams.get('doctor');
    if (doctorId) {
      const doctor = specialtiesDoctor?.data.find(d => d.id === doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
        setSelectedSpecialty(doctor.specialtyId);
        setCurrentStep(3);
      }
    }
  }, [searchParams]);

  const handleSpecialtySelect = (id: string) => {
    setSelectedSpecialty(id);
    setSelectedDoctor(null);
    setCurrentStep(2);
  };

  const handleDoctorSelect = (doctor: typeof specialtiesDoctor.data[0]) => {
    setSelectedDoctor(doctor);
    setCurrentStep(3);
  };

  const handleDateTimeSelect = (date: Date | undefined, time: string | undefined) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trouver le nom de la spécialité à partir de l'ID
    const specialtyName = specialties?.data.find(s => s.speciality_id === selectedSpecialty)?.speciality_name || '';
    
    // Formater la date et l'heure
    const appointmentDateTime = format(selectedDate!, `yyyy-MM-dd'T'HH:mm:ss`);
    
    // Construire le payload final
    const payload: AppointmentPayload = {
      appointment_speciality: specialtyName,
      appointment_doctor_id: selectedDoctor!.id,
      appointment_slot: selectedTime!,
      appointment_date_hour: appointmentDateTime,
      appointment_type: formData.appointment_type as 'myself' | 'other',
      appointment_user_lastname: formData.appointment_user_lastname,
      appointment_user_firstname: formData.appointment_user_firstname,
      appointment_user_gender: formData.appointment_user_gender,
      appointment_user_birthdate: formData.appointment_user_birthdate,
      appointment_user_job: formData.appointment_user_job,
      appointment_user_phone: formData.appointment_user_phone,
    };
    
    try {
      // Appeler la mutation
      await createAppointment(payload);
      
      // En cas de succès, rediriger vers la page de confirmation
      navigate('/confirmation', { 
        state: { 
          doctor: selectedDoctor,
          date: selectedDate,
          time: selectedTime,
          patient: formData
        } 
      });
    } catch (error) {
      // Gérer l'erreur en cas d'échec
      toast.error(
     'La prise de rendez-vous a échoué. Veuillez réessayer.',
      );
      console.error(error);
    }
  };
  
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return selectedSpecialty !== null;
      case 2:
         return selectedDoctor !== null;
      case 3:
        return selectedDate !== undefined && selectedTime !== undefined;
      case 4:
        return formData.appointment_user_firstname && formData.appointment_user_lastname && formData.email && formData.appointment_user_phone;
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
                <h2 className="text-xl font-semibold mb-4">Choisissez une Spécialité</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {specialties && specialties?.data.map((specialty) => (
                    <div 
                      key={specialty.speciality_id}
                      className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${
                        selectedDoctor?.speciality_id === specialty.speciality_id 
                          ? 'border-[#e83e8c] bg-clinic-secondary' 
                          : 'border-gray-200 hover:border-[#e83e8c]'
                      }`}
                      onClick={() => handleSpecialtySelect(specialty.speciality_id)}
                    >
                      <div className="flex items-center space-x-3">
                        
                        <div>
                          <div className="font-medium">{specialty.speciality_name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-soft p-6 animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-4">Choisissez un médecin</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {specialtiesDoctor?.data.map((doctor) => (
                    <div 
                      key={doctor.doctor_id}
                      className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 ${
                        selectedDoctor?.doctor_id === doctor.doctor_id 
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
                          <div className="font-medium">{doctor.doctor_firstname} {doctor.doctor_lastname}</div>
                          <div className="text-sm text-gray-500">{doctor.doctor_profile}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
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
            
            {/* Step 2: Date and Time Selection */}
            {currentStep === 3 && selectedDoctor && (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Médecin sélectionné</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDoctor.imageUrl}
                      alt={`${selectedDoctor.doctor_lastname} ${selectedDoctor.doctor_firstname}`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-lg">{selectedDoctor.doctor_lastname} {selectedDoctor.doctor_firstname}</div>
                      <div className="text-gray-500">{selectedDoctor.doctor_profile}</div>
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
            {currentStep === 4 && (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
                  
                  <form onSubmit={(e) => { e.preventDefault(); goToNextStep(); }}>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                <label className="block text-sm font-medium">Date de naissance *</label>
                <input type="date" name="appointment_user_birthdate" required className="..." value={formData.appointment_user_birthdate} onChange={handleInputChange} />
              </div>
              <div>
                <label className="block text-sm font-medium">Genre *</label>
                <select name="appointment_user_gender" required className="..." value={formData.appointment_user_gender} onChange={handleInputChange}>
                  <option>Masculin</option>
                  <option>Féminin</option>
                </select>
              </div>
               <div className="mb-6">
              <label className="block text-sm font-medium">Profession</label>
              <input type="text" name="appointment_user_job" className="..." value={formData.appointment_user_job} onChange={handleInputChange} />
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
                            value={formData.appointment_user_phone}
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
                        value={formData.appointment_user_notes}
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
            {currentStep === 5 && selectedDoctor && selectedDate && selectedTime && (
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
                      <div>Patient: {formData.appointment_user_firstname} {formData.appointment_user_lastname}</div>
                      <div>Email: {formData.email}</div>
                      <div>Téléphone: {formData.appointment_user_phone}</div>
                      {formData.appointment_user_notes && (
                        <div className="mt-2">
                          <div className="font-medium">Motif:</div>
                          <p>{formData.appointment_user_notes}</p>
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
                      className="p-2 border text-sm border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={goToPreviousStep}
                    >
                      Précédent
                    </button>
                    <button 
            className="..."
            onClick={handleSubmit}
            disabled={isPending} 
          >
            {isPending ? 'Confirmation en cours...' : 'Confirmer le rendez-vous'}
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
