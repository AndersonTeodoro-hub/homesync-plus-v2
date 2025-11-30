
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BalloonIcon, BookIcon, PlayCircleIcon, StarIcon, LoadingSpinnerIcon, LockIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface SyncKidsProps {
    voiceState: any;
    startVoiceSession: () => void;
}

// --- KID'S ADVENTURE DATA ---
const ADVENTURES = [
    { id: 1, title: 'Floresta Encantada', emoji: '🌲', color: 'from-emerald-400 to-green-500', locked: false, scene: 'A magical forest with talking animals and glowing mushrooms, cartoon style.' },
    { id: 2, title: 'Mundo dos Dinos', emoji: '🦕', color: 'from-orange-400 to-amber-500', locked: true, scene: 'A friendly dinosaur park with baby dinos playing, cartoon style.' },
    { id: 3, title: 'Viagem Espacial', emoji: '🚀', color: 'from-indigo-400 to-blue-500', locked: true, scene: 'Outer space with colorful planets and a cute rocket ship, cartoon style.' },
    { id: 4, title: 'Reino Doce', emoji: '🍭', color: 'from-pink-400 to-rose-500', locked: true, scene: 'A kingdom made of candy, chocolate rivers and lollipop trees, cartoon style.' },
];

export const SyncKids: React.FC<SyncKidsProps> = ({ voiceState, startVoiceSession }) => {
    const [viewMode, setViewMode] = useState<'map' | 'adventure'>('map');
    const [currentAdventure, setCurrentAdventure] = useState(ADVENTURES[0]);
    const [stars, setStars] = useState(12);
    const [generatedScene, setGeneratedScene] = useState<string | null>(null);
    const [isLoadingScene, setIsLoadingScene] = useState(false);

    // Generate Cartoon Scene when entering an adventure
    useEffect(() => {
        if (viewMode === 'adventure' && !generatedScene) {
            generateCartoonScene(currentAdventure.scene);
        }
    }, [viewMode, currentAdventure]);

    const generateCartoonScene = async (promptDescription: string) => {
        setIsLoadingScene(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `Cute colorful 3d pixar style illustration of ${promptDescription}, vibrant colors, happy atmosphere.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] }
            });

            if (response.candidates?.[0]?.content?.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        setGeneratedScene(`data:image/png;base64,${part.inlineData.data}`);
                        break;
                    }
                }
            }
        } catch (e) {
            console.error("Scene generation failed", e);
        } finally {
            setIsLoadingScene(false);
        }
    };

    const handleAdventureClick = (adv: any) => {
        if (adv.locked) return;
        setCurrentAdventure(adv);
        setViewMode('adventure');
    };

    return (
        <div className="flex flex-col h-full bg-[#fdf2f8] font-sans relative overflow-hidden">
             {/* --- KID'S HUD --- */}
             <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 p-4 flex justify-between items-center z-30 shadow-sm">
                <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-full border border-yellow-200">
                    <StarIcon className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-spin-slow" />
                    <span className="text-lg font-black text-yellow-600">{stars}</span>
                </div>
                <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-pink-500 uppercase tracking-widest">Modo Aventura</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto relative">
                 {/* --- MAP VIEW --- */}
                 {viewMode === 'map' && (
                    <div className="p-8 pb-20 flex flex-col items-center gap-12 min-h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-sm">MAPA MÁGICO</h2>
                            <p className="text-pink-400 font-bold">Escolha sua aventura!</p>
                        </div>

                        {ADVENTURES.map((adv, index) => (
                             <button 
                                key={adv.id}
                                onClick={() => handleAdventureClick(adv)}
                                disabled={adv.locked}
                                className={`relative w-28 h-28 rounded-3xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95
                                    ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}
                                    ${adv.locked ? 'bg-gray-200 grayscale opacity-80' : `bg-gradient-to-br ${adv.color} shadow-xl ring-4 ring-white`}
                                `}
                            >
                                {adv.locked ? (
                                    <LockIcon className="w-10 h-10 text-gray-400" />
                                ) : (
                                    <span className="text-5xl drop-shadow-md filter">{adv.emoji}</span>
                                )}
                                
                                <div className="absolute -bottom-10 w-40 text-center">
                                    <span className={`block font-black text-lg ${adv.locked ? 'text-gray-400' : 'text-pink-600'}`}>{adv.title}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                 )}

                {/* --- ADVENTURE VIEW --- */}
                {viewMode === 'adventure' && (
                    <div className="h-full flex flex-col bg-white">
                        <ModuleHeader 
                            title={`Sync Kids • ${currentAdventure.title}`}
                            icon={<BalloonIcon />} 
                            voiceState={voiceState} 
                            gradientFrom="from-pink-500" 
                            gradientTo="to-purple-500"
                            onAvatarClick={startVoiceSession}
                        />

                        {/* Magical Scene Area */}
                        <div className="relative h-[45%] w-full bg-pink-50 overflow-hidden">
                            {isLoadingScene ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-50">
                                    <LoadingSpinnerIcon className="w-10 h-10 text-pink-400" />
                                    <p className="text-sm font-bold text-pink-400 mt-2 animate-bounce">Criando mágica...</p>
                                </div>
                            ) : generatedScene ? (
                                <>
                                    <img src={generatedScene} alt="Scene" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-20"></div>
                                </>
                            ) : null}
                            
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-lg">
                                <span className="text-2xl">{currentAdventure.emoji}</span>
                            </div>
                        </div>

                        {/* Interaction Area */}
                        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-8 bg-white rounded-t-[30px] -mt-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                             {voiceState === 'idle' ? (
                                <div className="space-y-6 max-w-sm w-full animate-fade-in">
                                    <div className="bg-pink-50 p-6 rounded-3xl border-2 border-pink-100">
                                        <h3 className="text-2xl font-black text-pink-600 mb-2">Vamos Brincar?</h3>
                                        <p className="text-gray-600 font-medium">Toque no botão para entrar no mundo mágico!</p>
                                    </div>
                                    <button 
                                        onClick={startVoiceSession}
                                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 font-black text-white text-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 active:scale-95"
                                    >
                                        <PlayCircleIcon className="w-8 h-8" />
                                        COMEÇAR!
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-6 w-full">
                                    <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 ${voiceState === 'speaking' ? 'bg-pink-100 scale-110' : 'bg-gray-50'}`}>
                                         <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg ${voiceState === 'listening' ? 'animate-bounce' : ''}`}>
                                            <BalloonIcon className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-pink-50 px-6 py-3 rounded-full">
                                         <p className="text-pink-600 font-bold text-lg animate-pulse">
                                            {voiceState === 'listening' ? "Estou ouvindo..." : voiceState === 'speaking' ? "Falando..." : "Pensando..."}
                                        </p>
                                    </div>
                                </div>
                            )}

                             <button onClick={() => setViewMode('map')} className="text-gray-400 font-bold text-sm hover:text-pink-500 mt-auto uppercase tracking-wider">
                                Sair da Aventura
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
