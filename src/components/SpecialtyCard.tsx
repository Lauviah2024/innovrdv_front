
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface SpecialtyCardProps {
  name: string;
  icon: React.ReactNode;
  count: number;
  colorClass?: string;
  path: string;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({
  name,
  icon,
  count,
  colorClass = 'bg-clinic-secondary text-clinic-primary',
  path
}) => {
  return (
    <Link
      to={path}
      className="group"
    >
      <div className="bg-white rounded-xl p-6 shadow-soft group-hover:shadow-glass transition-all duration-300 transform group-hover:translate-y-[-4px]">
        <div className="flex items-start space-x-4">
          <div className={cn('p-3 rounded-lg', colorClass)}>
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-clinic-dark group-hover:text-[#e83e8c] transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {count} médecins disponibles
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpecialtyCard;
