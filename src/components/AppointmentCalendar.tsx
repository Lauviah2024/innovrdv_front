
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentCalendarProps {
  onSelectDateTime: (date: Date | undefined, time: string | undefined) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ onSelectDateTime }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  
  // Sample time slots - this would come from your API in a real app
  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '12:00', available: false },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true },
    { time: '16:30', available: true },
    { time: '17:00', available: true },
  ];

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setSelectedTime(undefined);
    onSelectDateTime(newDate, undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onSelectDateTime(date, time);
  };

  // Function to disable past days and weekends
  const isDateUnavailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (date < today) return true;
    
    // Disable weekends (0 is Sunday, 6 is Saturday)
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <div className="p-5 border-b">
        <h3 className="font-semibold text-lg text-clinic-dark">Choisir date et horaire</h3>
        <p className="text-sm text-gray-500">Sélectionnez le jour et l'heure qui vous conviennent</p>
      </div>
      
      <div className="grid md:grid-cols-2">
        <div className="p-4 md:border-r">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={isDateUnavailable}
            locale={fr}
            className="rounded-lg pointer-events-auto"
            classNames={{
              day_selected: "bg-clinic-primary text-white hover:bg-clinic-primary hover:text-white",
              day_today: "bg-clinic-secondary text-clinic-primary",
              nav_button: "hover:bg-clinic-secondary hover:text-clinic-primary",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1"
            }}
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <Clock size={16} className="mr-2" />
            <span>{date ? format(date, 'EEEE d MMMM yyyy', { locale: fr }) : 'Veuillez sélectionner une date'}</span>
          </div>
          
          {date ? (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  className={cn(
                    "py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                    !slot.available && "bg-gray-100 text-gray-400 cursor-not-allowed",
                    slot.available && selectedTime !== slot.time && "bg-white border border-gray-200 text-clinic-dark hover:border-clinic-primary",
                    slot.available && selectedTime === slot.time && "bg-clinic-primary text-white border border-clinic-primary"
                  )}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-400">
              <p>Veuillez d'abord sélectionner une date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
