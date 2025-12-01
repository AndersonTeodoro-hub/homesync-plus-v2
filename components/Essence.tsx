import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { HeartIcon, SmileIcon, SadIcon, NeutralIcon, ThunderIcon, LoadingSpinnerIcon } from './Icons';

export const Essence: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleMoodSelect = async (mood: string) => {
    setCurrentMood(mood);
    setIsGenerating(true);
    setMessage(null);
    try {
      // FIX: Use process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Eu estou me sentindo: ${mood}. Aja como um amigo sábio e estoico. Me dê um conselho curto e motivador.`;
      const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: [{ parts: [{ text: prompt }] }] });
      setMessage(response.text || "Erro ao gerar.");
    } catch (error) { setMessage("Erro de conexão."); } finally { setIsGenerating(false); }
  };

  const moods = [
    { id: 'feliz', label: 'Feliz', icon: <SmileIcon />, color: 'bg-emerald-500' },
    { id: 'ansioso', label: 'Ansioso', icon: <ThunderIcon />, color: 'bg-yellow-500' },
    { id: 'triste', label: 'Triste', icon: <SadIcon />, color: 'bg-blue-500' },
    { id: 'neutro', label: 'Cansado', icon: <NeutralIcon />, color: 'bg-gray-500' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-rose-500 to-purple-900 p-8 font-sans text-white">
      <header className="flex items-center space-x-3 mb-10"><div className="w-12 h-12 rounded-lg flex items-center justify-center bg-rose-400/20 text-rose-200"><HeartIcon /></div><h1 className="text-3xl font-bold">Essência</h1></header>
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8">Como você está?</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {moods.map((m) => (
            <button key={m.id} onClick={() => handleMoodSelect(m.id)} className={`p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-3 hover:scale-105 transition-all ${currentMood === m.id ? 'bg-white/20' : 'bg-black/20'}`}>
              <div className={`p-3 rounded-full text-white ${m.color}`}>{m.icon}</div><span>{m.label}</span>
            </button>
          ))}
        </div>
        {isGenerating && <LoadingSpinnerIcon />}
        {message && <div className="bg-white/10 p-6 rounded-3xl border border-white/20 animate-fade-in"><p className="text-lg leading-relaxed">{message}</p></div>}
      </div>
    </div>
  );
};