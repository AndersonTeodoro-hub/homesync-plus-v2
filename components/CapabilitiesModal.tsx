import React from 'react';
import { InventoryIcon, FinanceIcon, BabyIcon, LearnIcon, HeartIcon, NutritionistIcon, PersonalTrainerIcon, CheckCircleIcon, AsyncLogoIcon } from './Icons';

interface CapabilitiesModalProps { isOpen: boolean; onClose: () => void; }

export const CapabilitiesModal: React.FC<CapabilitiesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const capabilities = [
    { icon: <InventoryIcon />, title: "Visão", desc: "Vejo sua geladeira e crio receitas." },
    { icon: <BabyIcon />, title: "Babá", desc: "Histórias e cuidados para o bebê." },
    { icon: <FinanceIcon />, title: "Finanças", desc: "Gestão completa do orçamento." },
    { icon: <LearnIcon />, title: "Estudos", desc: "Flashcards e planos de aula." },
    { icon: <HeartIcon />, title: "Essência", desc: "Apoio emocional e estoicismo." },
    { icon: <NutritionistIcon />, title: "Nutri", desc: "Dietas e saúde alimentar." },
    { icon: <PersonalTrainerIcon />, title: "Treino", desc: "Fichas de exercício personalizadas." },
    { icon: <CheckCircleIcon />, title: "Tarefas", desc: "Organização da rotina diária." },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-900 text-white rounded-3xl p-6 w-full max-w-lg border border-white/10 relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <AsyncLogoIcon className="w-10 h-10" />
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Meus Poderes</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
            {capabilities.map((cap, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-indigo-400">{cap.icon}</div>
                    <div>
                        <h3 className="font-bold text-sm">{cap.title}</h3>
                        <p className="text-[10px] text-slate-400 leading-tight">{cap.desc}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-colors">Fechar</button>
      </div>
    </div>
  );
};