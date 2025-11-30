
import React from 'react';
import { CheckCircleIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface TasksProps { voiceState: any; startVoiceSession: () => void; }

export const Tasks: React.FC<TasksProps> = ({ voiceState, startVoiceSession }) => {
    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
            <ModuleHeader 
                title="Sync Organizer" 
                icon={<CheckCircleIcon />} 
                voiceState={voiceState} 
                gradientFrom="from-indigo-500" 
                gradientTo="to-violet-500" 
                onAvatarClick={startVoiceSession}
            />
            
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                 {/* Focus Mode */}
                 <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-6 rounded-3xl border-l-4 border-indigo-500 backdrop-blur-md">
                    <h3 className="text-indigo-300 font-bold mb-1">Foco Principal</h3>
                    <p className="text-xl font-bold">Terminar o Projeto Beta</p>
                    <p className="text-xs text-gray-400 mt-2">Prazo: Hoje às 18h</p>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">A Fazer</h3>
                    {[
                        { title: 'Reunião com Time', time: '14:00', tag: 'Trabalho' },
                        { title: 'Comprar Ração', time: '17:30', tag: 'Casa' },
                        { title: 'Ler 10 páginas', time: 'Noite', tag: 'Pessoal' },
                    ].map((task, i) => (
                        <div key={i} className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                            <div className="w-6 h-6 rounded-full border-2 border-indigo-400 group-hover:bg-indigo-400 transition-colors"></div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-200 group-hover:text-white transition-colors">{task.title}</p>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400">{task.time}</span>
                                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">{task.tag}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Completed */}
                <div className="opacity-50 mt-8">
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Concluído</h3>
                     <div className="flex items-center gap-4 p-3 bg-black/20 rounded-xl">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        <span className="text-sm line-through decoration-white/50">Academia (Treino A)</span>
                     </div>
                </div>
            </main>
        </div>
    );
};
