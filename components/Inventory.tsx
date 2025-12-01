import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { InventoryIcon, CameraIcon, LoadingSpinnerIcon, SparklesIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface InventoryProps {
    voiceState: any;
    startVoiceSession: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ voiceState, startVoiceSession }) => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [generatedRecipeImage, setGeneratedRecipeImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImage(base64);
                analyzeImage(base64.split(',')[1], file.type);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async (base64Data: string, mimeType: string) => {
        setIsAnalyzing(true);
        setAnalysis(null);
        setGeneratedRecipeImage(null);
        try {
            const apiKey = process.env.API_KEY;
            if (!apiKey) throw new Error("API Key not found");
            const ai = new GoogleGenAI({ apiKey });
            
            const prompt = `Você é a Chef Sync, especialista em gastronomia. Analise esta imagem da geladeira/despensa. Identifique os ingredientes principais. Sugira 1 receita sofisticada mas possível de fazer com esses itens. Seja breve e entusiasta. Retorne o nome do prato em negrito.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: {
                    parts: [
                        { inlineData: { mimeType, data: base64Data } },
                        { text: prompt }
                    ]
                }
            });
            
            const text = response.text || "Não consegui identificar os alimentos.";
            setAnalysis(text);

            const imagePrompt = `Ultra realistic, 4k, michelin star plating food photography of: ${text.slice(0, 150)}... cinematic lighting, macro shot.`;
            
            const imageResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: imagePrompt }] }
            });

            if (imageResponse.candidates?.[0]?.content?.parts) {
                for (const part of imageResponse.candidates[0].content.parts) {
                    if (part.inlineData) {
                        setGeneratedRecipeImage(`data:image/png;base64,${part.inlineData.data}`);
                        break;
                    }
                }
            }

        } catch (error) {
            setAnalysis("Tive um problema ao analisar sua geladeira. Tente novamente.");
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            <ModuleHeader 
                title="Chef Sync (Visão)" 
                icon={<InventoryIcon />} 
                voiceState={voiceState} 
                gradientFrom="from-purple-500" 
                gradientTo="to-pink-500" 
                onAvatarClick={startVoiceSession}
            />
            
            <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
                {!image ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
                            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10 group-hover:scale-105 transition-transform">
                                <CameraIcon className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">O que temos na geladeira?</h2>
                            <p className="text-purple-200 max-w-xs mx-auto">Tire uma foto e eu criarei uma receita exclusiva com o que você tem.</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-lg space-y-6 animate-fade-in pb-20">
                        <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl h-64 w-full">
                            <img src={image} alt="Fridge" className="w-full h-full object-cover" />
                            {isAnalyzing && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                                    <LoadingSpinnerIcon className="w-10 h-10 text-purple-400 mb-2" />
                                    <p className="text-sm font-semibold animate-pulse">A Chef Sync está analisando...</p>
                                </div>
                            )}
                        </div>

                        {analysis && (
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
                                <div className="flex items-center gap-2 mb-3 text-purple-300">
                                    <SparklesIcon />
                                    <h3 className="font-bold text-sm uppercase tracking-wider">Sugestão da Chef</h3>
                                </div>
                                <p className="text-gray-100 leading-relaxed whitespace-pre-line">{analysis}</p>
                            </div>
                        )}

                        {generatedRecipeImage && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold text-center text-purple-300 uppercase tracking-widest">Como vai ficar:</h3>
                                <div className="rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl relative">
                                    <img src={generatedRecipeImage} alt="Recipe Result" className="w-full h-auto" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                        <p className="text-xs text-center italic text-white/80">Imagem gerada por IA</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={() => { setImage(null); setAnalysis(null); setGeneratedRecipeImage(null); }}
                            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors border border-white/5"
                        >
                            Nova Análise
                        </button>
                    </div>
                )}
                
                <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    ref={fileInputRef} 
                    onChange={handleCapture} 
                    className="hidden" 
                />
            </main>
        </div>
    );
};