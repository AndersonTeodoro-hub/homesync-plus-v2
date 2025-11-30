
import React from 'react';
import { ShoppingCartIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface ShoppingProps { voiceState: any; startVoiceSession: () => void; }

export const Shopping: React.FC<ShoppingProps> = ({ voiceState, startVoiceSession }) => {
    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-teal-900 text-white">
            <ModuleHeader 
                title="Compras Inteligentes" 
                icon={<ShoppingCartIcon />} 
                voiceState={voiceState} 
                gradientFrom="from-teal-500" 
                gradientTo="to-cyan-500" 
                onAvatarClick={startVoiceSession}
            />
            
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-2xl flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                        <h3 className="font-bold text-teal-300 text-sm">Sugestão Automática</h3>
                        <p className="text-xs text-gray-300 mt-1">Baseado na foto da geladeira, o leite e os ovos estão acabando. Adicionei à lista.</p>
                    </div>
                </div>

                {[
                    { cat: 'Hortifruti', items: ['Tomate', 'Alface Americana', 'Banana Prata'] },
                    { cat: 'Mercearia', items: ['Arroz Integral', 'Azeite de Oliva'] },
                    { cat: 'Limpeza', items: ['Sabão em Pó', 'Detergente'] }
                ].map((section, idx) => (
                    <div key={idx} className="bg-white/5 rounded-3xl p-5 border border-white/5">
                        <h3 className="text-lg font-bold text-teal-200 mb-3 border-b border-white/10 pb-2">{section.cat}</h3>
                        <ul className="space-y-3">
                            {section.items.map((item, i) => (
                                <li key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded border border-gray-500 group-hover:border-teal-400 group-hover:bg-teal-400/20 transition-all"></div>
                                        <span className="text-gray-200 group-hover:text-white transition-colors">{item}</span>
                                    </div>
                                    <button className="text-gray-500 hover:text-red-400 text-xs">×</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </main>
            
            <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                <button onClick={startVoiceSession} className="w-full py-4 bg-teal-600 hover:bg-teal-500 rounded-2xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.02]">
                    Falar com Sync Shopper
                </button>
            </div>
        </div>
    );
};
