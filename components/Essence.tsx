import React from 'react';
import { HeartIcon, SmileIcon, SadIcon, NeutralIcon, ThunderIcon, LoadingSpinnerIcon } from './Icons';

interface EssenceProps {
  currentMood: string | null;
  isGenerating: boolean;
  message: string | null;
  onMoodSelect: (mood: string) => void;
}

export const Essence: React.FC<EssenceProps> = ({
  currentMood,
  isGenerating,
  message,
  onMoodSelect
}) => {

  const moods = [
    { id: 'feliz', label: 'Feliz', icon: <SmileIcon />, color: 'bg-emerald-500' },
    { id: 'ansioso', label: 'Ansioso', icon: <ThunderIcon />, color: 'bg-yellow-500' },
    { id: 'triste', label: 'Triste', icon: <SadIcon />, color: 'bg-blue-500' },
    { id: 'neutro', label: 'Cansado', icon: <NeutralIcon />, color: 'bg-gray-500' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-rose-500 to-purple-900 p-8 font-sans text-white">
      <header className="flex items-center space-x-3 mb-10">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-rose-400/20 text-rose-200">
          <HeartIcon />
        </div>
        <h1 className="text-3xl font-bold">Essência</h1>
      </header>

      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8">Como você está?</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => onMoodSelect(m.id)}
              className={`p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-3 hover:scale-105 transition-all ${
                currentMood === m.id ? 'bg-white/20' : 'bg-black/20'
              }`}
            >
              <div className={`p-3 rounded-full text-white ${m.color}`}>
                {m.icon}
              </div>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {isGenerating && <LoadingSpinnerIcon />}

        {message && (
          <div className="bg-white/10 p-6 rounded-3xl border border-white/20 animate-fade-in">
            <p className="text-lg leading-relaxed">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
