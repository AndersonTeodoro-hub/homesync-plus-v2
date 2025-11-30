
import React, { useState } from 'react';
import type { View } from '../types';
import { 
    InventoryIcon, FinanceIcon, BabyIcon, LearnIcon, HeartIcon, 
    NutritionistIcon, PersonalTrainerIcon, CheckCircleIcon, SyncPrimeLogo, 
    BalloonIcon, EnglishIcon
} from './Icons';

interface CapabilitiesModalProps { 
    isOpen: boolean; 
    onClose: () => void; 
    setView?: (view: View) => void;
}

interface Capability {
    id: string;
    view: View;
    icon: React.ReactElement;
    title: string;
    shortDesc: string;
    fullDesc: string;
    howToUse: string;
    benefit: string;
    color: string;
}

export const CapabilitiesModal: React.FC<CapabilitiesModalProps> = ({ isOpen, onClose, setView }) => {
  const [selectedCap, setSelectedCap] = useState<Capability | null>(null);

  if (!isOpen) return null;

  const capabilities: Capability[] = [
    { 
        id: 'kids', view: 'sync-kids', icon: <BalloonIcon />, title: "Sync Kids", 
        shortDesc: "Aventura mágica e educativa.",
        fullDesc: "Transforme o aprendizado em uma jornada mágica! A Sync assume a personalidade de uma 'Amiguinha Guia' que leva a criança para florestas encantadas e espaço sideral.",
        howToUse: "Clique no microfone e diga 'Vamos brincar'. A Sync contará histórias interativas e jogos educativos.",
        benefit: "Educação sem telas viciantes. Estimula a imaginação e ensina valores morais.",
        color: "from-yellow-400 to-orange-500"
    },
    { 
        id: 'english', view: 'english-course', icon: <EnglishIcon />, title: "Fluency Coach", 
        shortDesc: "Inglês do zero à fluência.",
        fullDesc: "A única mentora de idiomas que usa o 'Método de Fluência Imersiva'. Ela corrige sua pronúncia em tempo real (nota 0-10) e gera cenários visuais para cada conversa.",
        howToUse: "Entre no módulo, escolha seu nível na Jornada e comece o Roleplay. Fale naturalmente.",
        benefit: "Perca o medo de falar. É como ter um professor nativo particular 24h por dia.",
        color: "from-blue-500 to-cyan-500"
    },
    { 
        id: 'vision', view: 'inventory', icon: <InventoryIcon />, title: "Chef Vision", 
        shortDesc: "Receitas com o que você tem.",
        fullDesc: "Pare de desperdiçar comida! Aponte a câmera para sua geladeira aberta. A Sync identifica cada ingrediente e cria uma receita gourmet na hora, gerando até a foto do prato.",
        howToUse: "Abra o módulo, clique na câmera e tire uma foto. A mágica acontece em segundos.",
        benefit: "Economia real no mercado e refeições deliciosas sem estresse.",
        color: "from-purple-500 to-pink-500"
    },
    { 
        id: 'finance', view: 'finances', icon: <FinanceIcon />, title: "CFO Pessoal", 
        shortDesc: "Gestão financeira de elite.",
        fullDesc: "Sua Diretora Financeira Pessoal. Ela analisa seus gráficos, critica gastos desnecessários e traça metas de investimento agressivas para sua liberdade financeira.",
        howToUse: "Fale com ela sobre seus gastos ou peça uma análise do dashboard.",
        benefit: "Controle total do seu dinheiro com a inteligência de um consultor de Wall Street.",
        color: "from-emerald-500 to-teal-500"
    },
    { 
        id: 'babysitter', view: 'babysitter', icon: <BabyIcon />, title: "Modo Babá", 
        shortDesc: "Monitoramento e histórias.",
        fullDesc: "Um par de olhos e ouvidos extras. A Sync pode escutar o ambiente (beta) ou contar histórias de ninar com voz suave e calmante para ajudar no sono.",
        howToUse: "Ative o modo e deixe o dispositivo próximo (mas seguro). Peça 'Conte uma história de dormir'.",
        benefit: "Paz de espírito para os pais e sono tranquilo para o bebê.",
        color: "from-pink-400 to-rose-400"
    },
    { 
        id: 'nutrition', view: 'nutritionist', icon: <NutritionistIcon />, title: "Nutricionista", 
        shortDesc: "Dieta e saúde integradas.",
        fullDesc: "Não é só contar calorias. É entender seu corpo. Receba planos alimentares baseados nos seus objetivos (perda de peso, hipertrofia) e restrições.",
        howToUse: "Diga o que você comeu ou pergunte 'O que posso jantar hoje que seja saudável?'.",
        benefit: "Saúde vibrante e corpo em forma sem dietas malucas.",
        color: "from-green-500 to-lime-500"
    },
    { 
        id: 'essence', view: 'essence', icon: <HeartIcon />, title: "Essência", 
        shortDesc: "Inteligência Emocional.",
        fullDesc: "Um refúgio para sua mente. Baseada no Estoicismo e Psicologia Positiva, a Sync oferece conselhos para ansiedade, estresse e dias difíceis.",
        howToUse: "Diga como se sente. 'Estou ansioso' ou 'Tive um dia ruim'.",
        benefit: "Clareza mental e força emocional imediata.",
        color: "from-rose-500 to-purple-600"
    },
    { 
        id: 'tasks', view: 'tasks', icon: <CheckCircleIcon />, title: "Organização", 
        shortDesc: "Produtividade máxima.",
        fullDesc: "Gerencie o caos da vida moderna. Priorize tarefas usando a Matriz de Eisenhower e nunca mais esqueça um compromisso importante.",
        howToUse: "Dite suas tarefas: 'Tenho reunião às 14h'. Ela organiza tudo.",
        benefit: "Mais tempo livre para você e menos carga mental.",
        color: "from-indigo-500 to-violet-500"
    },
    { 
        id: 'trainer', view: 'personal-trainer', icon: <PersonalTrainerIcon />, title: "Treinador", 
        shortDesc: "Fichas de treino personalizadas.",
        fullDesc: "Seu personal trainer de bolso. Cria treinos para casa ou academia, corrige execução (via texto/voz) e mantém sua motivação no topo.",
        howToUse: "Diga 'Quero treinar pernas hoje' ou 'Tenho apenas 20 minutos'.",
        benefit: "Resultados consistentes e motivação diária.",
        color: "from-orange-500 to-red-500"
    },
  ];

  const handleAction = (view: View) => {
      if (setView) {
          setView(view);
          onClose();
      }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-[#0f172a] text-white rounded-[40px] w-full max-w-lg border border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3">
                <SyncPrimeLogo className="w-8 h-8 rounded-lg" />
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {selectedCap ? 'Detalhes do Poder' : 'Meus Poderes'}
                </h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">×</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {!selectedCap ? (
                // GRID VIEW
                <div className="grid grid-cols-2 gap-4">
                    {capabilities.map((cap) => (
                        <button 
                            key={cap.id} 
                            onClick={() => setSelectedCap(cap)}
                            className="flex flex-col gap-3 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all text-left group"
                        >
                            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${cap.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                                {React.cloneElement(cap.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                            </div>
                            <div>
                                <h3 className="font-bold text-base">{cap.title}</h3>
                                <p className="text-[11px] text-gray-400 leading-tight mt-1">{cap.shortDesc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                // DETAIL VIEW
                <div className="animate-fade-in space-y-6">
                    <button 
                        onClick={() => setSelectedCap(null)}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 mb-2"
                    >
                        ← Voltar para lista
                    </button>

                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${selectedCap.color} flex items-center justify-center text-white shadow-2xl`}>
                            {React.cloneElement(selectedCap.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">{selectedCap.title}</h2>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Módulo Avançado</span>
                        </div>
                    </div>

                    <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                        <p className="text-lg leading-relaxed font-medium text-gray-100">{selectedCap.fullDesc}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                         <div className="bg-blue-900/20 p-4 rounded-2xl border-l-4 border-blue-500">
                            <h4 className="text-blue-300 font-bold text-sm uppercase mb-1">Como usar</h4>
                            <p className="text-sm text-gray-300">{selectedCap.howToUse}</p>
                        </div>
                        <div className="bg-green-900/20 p-4 rounded-2xl border-l-4 border-green-500">
                            <h4 className="text-green-300 font-bold text-sm uppercase mb-1">Benefício Real</h4>
                            <p className="text-sm text-gray-300">{selectedCap.benefit}</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => handleAction(selectedCap.view)}
                        className={`w-full py-4 rounded-2xl bg-gradient-to-r ${selectedCap.color} font-bold text-white shadow-lg hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2`}
                    >
                        ATIVAR AGORA
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
