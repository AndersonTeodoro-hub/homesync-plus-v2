
import React from 'react';
import { SyncPrimeLogo, GlobeIcon } from './Icons';
import type { Language } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (lang: Language) => void;
  currentLang: Language;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose, onSelect, currentLang }) => {
  if (!isOpen) return null;

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
    { id: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { id: 'es-ES', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-900 text-white rounded-3xl p-6 w-full max-w-sm border border-white/10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <GlobeIcon className="w-8 h-8 text-blue-400" />
            <h2 className="text-xl font-bold">Idioma Nativo</h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">Selecione seu idioma principal. A Sync usará isso para explicar conceitos difíceis.</p>
        
        <div className="space-y-3">
            {languages.map((lang) => (
                <button 
                    key={lang.id}
                    onClick={() => { onSelect(lang.id); onClose(); }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${currentLang === lang.id ? 'bg-blue-600/20 border-blue-500 shadow-lg' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-bold">{lang.label}</span>
                    </div>
                    {currentLang === lang.id && <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>}
                </button>
            ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full py-3 bg-transparent text-gray-400 hover:text-white text-sm">Cancelar</button>
      </div>
    </div>
  );
};
