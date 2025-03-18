
import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  availability?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  specialty,
  imageUrl,
  rating,
  reviewCount,
  availability
}) => {
  return (
    <div className="glass-effect rounded-xl overflow-hidden animate-scale-in">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`Dr. ${name}`} 
          className="w-full h-48 object-cover"
        />
        
        {availability && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-clinic-primary text-xs font-medium py-1 px-2 rounded-full">
            {availability}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg text-clinic-dark">{name}</h3>
        <p className="text-sm text-gray-500 mb-3">{specialty}</p>
        
        <div className="flex items-center mt-1 mb-4">
          <div className="flex items-center space-x-1 text-amber-400">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-400 ml-2">({reviewCount} avis)</span>
        </div>
        
        <Link 
          to={`/appointment?doctor=${id}`} 
          className="w-full flex items-center justify-center gap-2 py-2 bg-clinic-primary text-white rounded-lg shadow-sm hover:shadow-button transition-all duration-300"
        >
          <Calendar size={16} />
          <span>Prendre RDV</span>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
