
import React, { useState, useEffect } from 'react';
import type { View, Message } from '../types';
import { CapabilitiesModal } from './CapabilitiesModal';
import { 
    MicIcon, CameraIcon, SparklesIcon, FamilyIcon, EnglishIcon, BabyIcon, 
    NutritionistIcon, PersonalTrainerIcon, HeartIcon, BalloonIcon, GlobeIcon, 
    DownloadIcon, SunIcon, MoonIcon, ClockIcon, SettingsIcon, CalendarIcon, 
    ListBulletIcon, PhoneIcon, CheckCircleIcon, SyncPrimeLogo, UserCircleIcon,
    LoadingSpinnerIcon
} from './Icons';

type AppState = 'sleeping' | 'active';
type VoiceState = 'idle' | 'listening' | 'speaking' | 'thinking';

interface HomeProps { 
    appState: AppState; 
    voiceState: VoiceState; 
    error: string | null; 
    setView: (view: View) => void; 
    startVoiceSession: () => void; 
    onShareApp: () => void; 
    onOpenLanguage: () => void; 
    installPrompt?: any;
    messages?: Message[];
    userName?: string;
}

export const Home: React.FC<HomeProps> = ({ 
    appState, voiceState, error, setView, startVoiceSession, 
    onShareApp, onOpenLanguage, installPrompt, messages = [], userName = 'Usuário' 
}) => {
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'night'>('morning');

  // URL do Avatar - Substitua por '/avatar.png' se colocar o arquivo na pasta public
  const AVATAR_URL = "https://img.freepik.com/premium-photo/3d-avatar-profession-as-customer-service-agent_1029469-223630.jpg?w=740"; 

  useEffect(() => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
      else setTimeOfDay('night');
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') console.log('User accepted');
      });
    }
  };

  const getGreeting = () => {
      if (timeOfDay === 'morning') return 'Bom dia';
      if (timeOfDay === 'afternoon') return 'Boa tarde';
      return 'Boa noite';
  };

  const getSuggestion = () => {
      if (timeOfDay === 'morning') return { text: "Sua primeira tarefa é às 09h. Quer revisar o dia?", action: "Revisar Agenda", icon: <CalendarIcon /> };
      if (timeOfDay === 'afternoon') return { text: "Hora do almoço. Sugerir algo leve?", action: "Ver Opções", icon: <NutritionistIcon /> };
      return { text: "Dia encerrado. Ativar modo 'Descompressão'?", action: "Ativar", icon: <MoonIcon /> };
  };

  const suggestion = getSuggestion();

  return (
        <div className="flex flex-col h-full relative overflow-hidden bg-[#f8f9fa] text-slate-800 font-sans">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-60"></div>
            </div>

            {/* --- HEADER --- */}
            <header className="relative z-20 px-6 pt-6 pb-2 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <SyncPrimeLogo className="w-8 h-8 drop-shadow-sm" />
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{getGreeting()},</p>
                        <h1 className="text-xl font-bold text-slate-900">{userName}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onOpenLanguage} className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all text-blue-600">
                        <GlobeIcon className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm">
                        <UserCircleIcon className="w-6 h-6 text-slate-500" />
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto px-6 py-4 custom-scrollbar space-y-8">
                
                {/* --- HERO AVATAR (Interactive) --- */}
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative group cursor-pointer" onClick={startVoiceSession}>
                        {/* 1. Glow Effects (Background Aura) */}
                        <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 
                            ${voiceState === 'listening' ? 'bg-green-400/50 scale-125 opacity-100' : 
                              voiceState === 'speaking' ? 'bg-blue-500/50 scale-110 opacity-100' : 
                              voiceState === 'thinking' ? 'bg-purple-500/50 scale-110 opacity-100' : 
                              'bg-blue-500/10 scale-100 opacity-0 group-hover:opacity-60'}`}
                        ></div>

                        {/* 2. Avatar Container */}
                        <div className={`relative w-48 h-48 rounded-full p-1 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 active:scale-95
                            ${voiceState === 'listening' ? 'scale-105' : ''}
                        `}>
                            {/* Avatar Image */}
                            <img 
                                src={AVATAR_URL}
                                alt="Sync Avatar" 
                                className={`w-full h-full rounded-full object-cover border-[6px] transition-all duration-500
                                    ${voiceState === 'listening' ? 'border-green-400' : 
                                      voiceState === 'speaking' ? 'border-blue-500' : 
                                      voiceState === 'thinking' ? 'border-purple-400' : 
                                      'border-white grayscale-[0.1]'}
                                `}
                            />
                            
                            {/* 3. Status Badge (Floating Icon) */}
                            <div className={`absolute bottom-2 right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 z-10 transition-colors duration-300
                                ${voiceState === 'listening' ? 'border-green-100' : 
                                  voiceState === 'speaking' ? 'border-blue-100' : 
                                  'border-gray-100'}
                            `}>
                                 {voiceState === 'idle' && <MicIcon className="w-6 h-6 text-blue-600" />}
                                 
                                 {voiceState === 'listening' && (
                                    <div className="relative flex items-center justify-center">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                        <div className="w-3 h-3 bg-green-500 rounded-full relative z-10"></div>
                                    </div>
                                 )}
                                 
                                 {voiceState === 'thinking' && <LoadingSpinnerIcon className="w-6 h-6 text-purple-600" />}
                                 
                                 {voiceState === 'speaking' && (
                                    <div className="flex gap-0.5 h-3 items-end">
                                        <span className="w-1 bg-blue-500 h-full animate-[bounce_1s_infinite]"></span>
                                        <span className="w-1 bg-blue-500 h-2/3 animate-[bounce_1.2s_infinite]"></span>
                                        <span className="w-1 bg-blue-500 h-full animate-[bounce_0.8s_infinite]"></span>
                                    </div>
                                 )}
                            </div>
                        </div>

                        {/* 4. Status Label */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className={`text-sm font-bold tracking-wide uppercase transition-colors 
                                ${voiceState === 'listening' ? 'text-green-600' : 
                                  voiceState === 'speaking' ? 'text-blue-600' : 
                                  voiceState === 'thinking' ? 'text-purple-600' : 
                                  'text-gray-400'}`}>
                                {voiceState === 'idle' ? "Toque para falar" : 
                                 voiceState === 'listening' ? "Ouvindo..." : 
                                 voiceState === 'thinking' ? "Processando..." : 
                                 "Falando..."}
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- SMART SUGGESTION --- */}
                <div className="bg-white/60 backdrop-blur-md border border-white/50 p-4 rounded-2xl shadow-sm flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            {React.cloneElement(suggestion.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                        </div>
                        <p className="text-sm font-medium text-slate-700 leading-tight max-w-[180px]">{suggestion.text}</p>
                    </div>
                    <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                        {suggestion.action}
                    </button>
                </div>

                {/* --- QUICK ACTIONS --- */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setView('tasks')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-shadow group">
                        <ListBulletIcon className="w-6 h-6 text-indigo-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-gray-600">Tarefas</span>
                    </button>
                    <button onClick={() => setView('family')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-shadow group">
                        <PhoneIcon className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-gray-600">Ligar</span>
                    </button>
                    <button onClick={() => setView('finances')} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:shadow-md transition-shadow group">
                        <div className="w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center text-[10px] font-bold text-orange-400">$</div>
                        <span className="text-xs font-bold text-gray-600">Finanças</span>
                    </button>
                    <button onClick={() => setIsCapabilitiesOpen(true)} className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-200 flex flex-col items-center gap-2 hover:bg-blue-700 transition-colors group">
                        <SparklesIcon className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-bold text-white">Explorar</span>
                    </button>
                </div>

                {/* --- RECENT HISTORY --- */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-gray-400" /> Recentes
                        </h3>
                        <span className="text-[10px] font-bold text-blue-600 cursor-pointer">Ver tudo</span>
                    </div>
                    
                    <div className="space-y-3">
                        {messages.length === 0 ? (
                            <div className="text-center py-6 text-gray-400 text-xs italic bg-gray-50 rounded-xl border border-gray-100">
                                Nenhuma atividade recente.
                            </div>
                        ) : (
                            messages.slice(-3).reverse().map((msg) => (
                                <div key={msg.id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-100">
                                    <div className={`w-2 h-full rounded-full self-stretch ${msg.role === 'user' ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-gray-900 mb-0.5">{msg.role === 'user' ? 'Você' : 'Sync'}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{msg.text}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">Agora</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Install Banner (PWA) */}
                {installPrompt && (
                    <div className="mt-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
                        <div>
                            <p className="font-bold text-sm">Instalar App</p>
                            <p className="text-xs text-gray-400">Acesso rápido na tela inicial.</p>
                        </div>
                        <button onClick={handleInstallClick} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <DownloadIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 text-center">{error}</div>}
            </main>

            <CapabilitiesModal isOpen={isCapabilitiesOpen} onClose={() => setIsCapabilitiesOpen(false)} setView={setView} />
        </div>
    );
};
