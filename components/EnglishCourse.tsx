import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { EnglishIcon, StarIcon, FireIcon, TrophyIcon, HeartIcon, LockIcon, PlayCircleIcon, LoadingSpinnerIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface EnglishCourseProps {
    voiceState: any;
    startVoiceSession: () => void;
}

const LEVELS = [
    { id: 1, title: 'Introduction', subtitle: 'Greetings & Basics', color: 'from-blue-500 to-cyan-400', locked: false, scene: 'A friendly cafe in New York City, morning light.' },
    { id: 2, title: 'Travel', subtitle: 'Airports & Hotels', color: 'from-purple-500 to-pink-500', locked: true, scene: 'Busy Heathrow Airport terminal, modern architecture.' },
    { id: 3, title: 'Business', subtitle: 'Meetings & Calls', color: 'from-emerald-500 to-teal-500', locked: true, scene: 'High-end boardroom with glass windows, city view.' },
    { id: 4, title: 'Social', subtitle: 'Making Friends', color: 'from-orange-500 to-red-500', locked: true, scene: 'Rooftop party at sunset, relaxed atmosphere.' },
];

export const EnglishCourse: React.FC<EnglishCourseProps> = ({ voiceState, startVoiceSession }) => {
    const [viewMode, setViewMode] = useState<'map' | 'lesson'>('map');
    const [currentLevel, setCurrentLevel] = useState(LEVELS[0]);
    const [xp, setXp] = useState(1250);
    const [streak, setStreak] = useState(12);
    const [lives, setLives] = useState(5);
    const [generatedScene, setGeneratedScene] = useState<string | null>(null);
    const [isLoadingScene, setIsLoadingScene] = useState(false);

    useEffect(() => {
        if (viewMode === 'lesson' && !generatedScene) {
            generateSceneImage(currentLevel.scene);
        }
    }, [viewMode, currentLevel]);

    const generateSceneImage = async (promptDescription: string) => {
        setIsLoadingScene(true);
        try {
            const apiKey = process.env.API_KEY;
            if (!apiKey) throw new Error("API Key not found");
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `Cinematic concept art of ${promptDescription}, immersive atmosphere, 4k, trending on artstation, no text.`;
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

    const handleLevelClick = (level: any) => {
        if (level.locked) return;
        setCurrentLevel(level);
        setViewMode('lesson');
    };

    return (
        <div className="flex flex-col h-full bg-[#0f172a] text-white font-sans relative overflow-hidden">
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-3 flex justify-between items-center z-30">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                        <FireIcon className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-orange-400">{streak}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-bold text-yellow-300">{xp} XP</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <HeartIcon className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                    <span className="text-sm font-bold">{lives}</span>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto relative">
                {viewMode === 'map' && (
                    <div className="p-8 pb-20 flex flex-col items-center gap-8 min-h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SYNC FLUENCY</h2>
                            <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">Select your path</p>
                        </div>

                        {LEVELS.map((level, index) => (
                            <button 
                                key={level.id}
                                onClick={() => handleLevelClick(level)}
                                disabled={level.locked}
                                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform 
                                    ${index % 2 === 0 ? '-translate-x-8' : 'translate-x-8'}
                                    ${level.locked ? 'bg-slate-800 grayscale opacity-70' : `bg-gradient-to-br ${level.color} shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-110`}
                                `}
                            >
                                <div className="absolute inset-0 rounded-full border-4 border-slate-900/50"></div>
                                {level.locked ? (
                                    <LockIcon className="w-8 h-8 text-slate-500" />
                                ) : (
                                    <StarIcon className="w-10 h-10 text-white fill-white animate-bounce-slow" />
                                )}
                                
                                <div className="absolute -bottom-10 w-40 text-center">
                                    <span className={`block font-bold text-sm ${level.locked ? 'text-slate-500' : 'text-white'}`}>{level.title}</span>
                                    {!level.locked && <span className="text-[10px] text-blue-300">{level.subtitle}</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {viewMode === 'lesson' && (
                    <div className="h-full flex flex-col">
                        <ModuleHeader 
                            title={`Teacher Sync • ${currentLevel.title}`}
                            icon={<EnglishIcon />} 
                            voiceState={voiceState} 
                            gradientFrom="from-blue-600" 
                            gradientTo="to-indigo-600"
                            onAvatarClick={startVoiceSession}
                        />

                        <div className="relative h-[40%] w-full bg-black">
                            {isLoadingScene ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                                    <LoadingSpinnerIcon className="w-8 h-8 text-blue-500" />
                                    <p className="text-xs text-blue-300 mt-2 animate-pulse">Generating immersive scene...</p>
                                </div>
                            ) : generatedScene ? (
                                <>
                                    <img src={generatedScene} alt="Scene" className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                                </>
                            ) : null}
                            
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] uppercase font-bold text-blue-300 border border-blue-500/30">Current Scenario</span>
                                <h3 className="text-xl font-bold text-white leading-tight mt-1">{currentLevel.subtitle}</h3>
                            </div>
                        </div>

                        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-6 bg-[#0f172a]">
                            
                            {voiceState === 'idle' ? (
                                <div className="bg-slate-800/50 p-6 rounded-3xl border border-white/5 max-w-sm w-full animate-fade-in">
                                    <h3 className="text-lg font-bold text-white mb-2">Ready to speak?</h3>
                                    <p className="text-sm text-slate-400 mb-6">Teacher Sync will listen to your pronunciation and give you a score (1-10).</p>
                                    <button 
                                        onClick={startVoiceSession}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <PlayCircleIcon className="w-6 h-6" />
                                        Start Class
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4 w-full">
                                    <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${voiceState === 'speaking' ? 'bg-blue-500/20 scale-110 shadow-[0_0_50px_rgba(59,130,246,0.5)]' : 'bg-slate-800'}`}>
                                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ${voiceState === 'listening' ? 'animate-pulse' : ''}`}>
                                            <EnglishIcon className="w-10 h-10 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <p className="text-blue-300 font-bold text-lg animate-pulse">
                                            {voiceState === 'listening' ? "Listening..." : voiceState === 'speaking' ? "Teacher Sync is speaking..." : "Thinking..."}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
                                            Tip: Speak clearly. If you make a mistake, I will help you fix it.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setViewMode('map')} className="text-slate-500 text-xs hover:text-white mt-auto">
                                Exit Lesson
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};