import React from 'react';
import { LoadingSpinnerIcon } from './Icons';

export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center p-4">
    <LoadingSpinnerIcon className="w-6 h-6 text-white/50 animate-spin" />
  </div>
);