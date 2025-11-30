
import React from 'react';
import { FinanceIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface FinancesProps { voiceState: any; startVoiceSession: () => void; }

export const Finances: React.FC<FinancesProps> = ({ voiceState, startVoiceSession }) => {
    // Mock Data simulating advanced backend
    const stats = [
        { label: 'Saldo Atual', value: 'R$ 12.450,00', color: 'text-emerald-400' },
        { label: 'Gastos (Mês)', value: 'R$ 3.200,00', color: 'text-red-400' },
        { label: 'Meta', value: '75%', color: 'text-blue-400' },
    ];

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-blue-900 text-white">
            <ModuleHeader 
                title="Sync CFO (Finanças)" 
                icon={<FinanceIcon />} 
                voiceState={voiceState} 
                gradientFrom="from-emerald-500" 
                gradientTo="to-teal-500"
                onAvatarClick={startVoiceSession}
            />
            
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* AI Insight Card */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 p-6 rounded-3xl border border-emerald-500/20 backdrop-blur-md">
                    <h3 className="text-emerald-300 font-bold mb-2 flex items-center gap-2">
                        <span className="text-xl">🤖</span> Análise Rápida
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-200">
                        "Notei que seus gastos com delivery aumentaram 15% esta semana. Se mantivermos a meta, podemos investir R$ 500,00 a mais no Tesouro Direto. O que acha?"
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-black/20 p-4 rounded-2xl border border-white/5 text-center">
                            <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">{stat.label}</p>
                            <p className={`font-bold text-sm md:text-lg ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Simulated Chart */}
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Fluxo de Caixa</h3>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-blue-500/30 rounded-t-lg hover:bg-blue-400 transition-all relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Dia {i+1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transactions List */}
                <div>
                    <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase">Últimas Transações</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Supermercado Extra', date: 'Hoje', val: '- R$ 450,00', type: 'expense' },
                            { name: 'Spotify Premium', date: 'Ontem', val: '- R$ 21,90', type: 'expense' },
                            { name: 'Pix Recebido', date: '12/02', val: '+ R$ 1.200,00', type: 'income' },
                        ].map((t, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <div>
                                    <p className="font-bold text-sm">{t.name}</p>
                                    <p className="text-[10px] text-gray-500">{t.date}</p>
                                </div>
                                <span className={`font-mono text-sm ${t.type === 'income' ? 'text-emerald-400' : 'text-gray-300'}`}>{t.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
