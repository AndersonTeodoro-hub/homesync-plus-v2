
import React, { useState, useEffect, useRef } from 'react';
import { BabyIcon, PhoneIcon, LoadingSpinnerIcon } from './Icons';
import { ModuleHeader } from './ModuleHeader';

interface BabysitterProps {
    voiceState: any;
    startVoiceSession: () => void;
}

export const Babysitter: React.FC<BabysitterProps> = ({ voiceState, startVoiceSession }) => {
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(0);
    const [status, setStatus] = useState<'calm' | 'alert' | 'cry' | 'silence'>('calm');
    const [statusText, setStatusText] = useState("Ambiente Calmo");
    const [emergencyTimer, setEmergencyTimer] = useState(0);
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const requestRef = useRef<number | null>(null);
    const silenceTimeoutRef = useRef<any>(null);

    // EMERGENCY CONTACT (Simulated)
    const emergencyContact = { name: "Pai/Mãe", number: "11999999999" };

    const startMonitoring = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            analyserRef.current = audioContextRef.current.createAnalyser();
            microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
            microphoneRef.current.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;
            setIsMonitoring(true);
            updateNoiseLevel();
            startSilenceCheck();
        } catch (err) {
            console.error("Mic Error:", err);
            alert("Preciso de acesso ao microfone para monitorar o bebê.");
        }
    };

    const stopMonitoring = () => {
        setIsMonitoring(false);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (microphoneRef.current) microphoneRef.current.disconnect();
        if (audioContextRef.current) audioContextRef.current.close();
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        setStatus('calm');
        setNoiseLevel(0);
    };

    const updateNoiseLevel = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate Average Volume
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const average = sum / dataArray.length;
        setNoiseLevel(average);

        // DETECTION LOGIC
        if (average > 50) { // Threshold for Crying/Loud Noise
            setStatus('cry');
            setStatusText("⚠️ Choro ou Barulho Alto Detectado!");
            resetSilenceCheck();
        } else if (average > 20) {
            setStatus('alert');
            setStatusText("Movimento/Barulho Suave");
            resetSilenceCheck();
        } else {
            setStatus('calm');
            setStatusText("Dormindo / Silêncio");
        }

        requestRef.current = requestAnimationFrame(updateNoiseLevel);
    };

    // Silence Check (Simulating disconnection or extreme quiet which might be suspicious in some contexts, or just deep sleep)
    // For this demo, we focus on CRYING triggering the call.
    const startSilenceCheck = () => {
        // Logic placeholder
    };
    const resetSilenceCheck = () => {
        // Logic placeholder
    };

    // EMERGENCY TRIGGER LOGIC
    useEffect(() => {
        let interval: any;
        if (status === 'cry' && isMonitoring) {
            interval = setInterval(() => {
                setEmergencyTimer(prev => prev + 1);
            }, 1000);
        } else {
            setEmergencyTimer(0);
        }
        return () => clearInterval(interval);
    }, [status, isMonitoring]);

    // TRIGGER CALL
    useEffect(() => {
        if (emergencyTimer > 8 && !isEmergencyActive) { // If crying for > 8 seconds
            triggerEmergencyProtocol();
        }
    }, [emergencyTimer, isEmergencyActive]);

    const triggerEmergencyProtocol = () => {
        setIsEmergencyActive(true);
        // Simulate API Call Logic found in App.tsx
        // In a real app, this would dispatch an event or call a prop function provided by App.tsx
        console.log("TRIGGERING EMERGENCY CALL");
        setTimeout(() => setIsEmergencyActive(false), 8000); // Reset after 8s for demo
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-rose-100 to-indigo-100 text-slate-800 relative overflow-hidden">
            <ModuleHeader 
                title="Sync Nanny (Babá)" 
                icon={<BabyIcon />} 
                voiceState={voiceState} 
                gradientFrom="from-rose-400" 
                gradientTo="to-pink-400" 
                onAvatarClick={startVoiceSession}
            />

            {isEmergencyActive && (
                <div className="absolute inset-0 z-50 bg-red-600 flex flex-col items-center justify-center text-white animate-pulse">
                    <PhoneIcon className="w-24 h-24 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-black uppercase">Emergência!</h2>
                    <p className="text-xl mb-8">Disparando ligação para {emergencyContact.name}...</p>
                    <button 
                        onClick={() => setIsEmergencyActive(false)}
                        className="bg-white text-red-600 px-8 py-3 rounded-full font-bold"
                    >
                        CANCELAR
                    </button>
                </div>
            )}
            
            <main className="flex-1 p-6 flex flex-col items-center justify-center space-y-8">
                
                {/* Visual Monitor */}
                <div className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl
                    ${status === 'cry' ? 'bg-red-100 border-4 border-red-500 shadow-red-300' : 
                      status === 'alert' ? 'bg-yellow-100 border-4 border-yellow-400' : 
                      isMonitoring ? 'bg-emerald-100 border-4 border-emerald-400' : 'bg-slate-200 border-4 border-slate-300'}
                `}>
                    {/* Ripple Effect */}
                    {isMonitoring && (
                        <>
                            <div className="absolute inset-0 rounded-full border-2 border-current opacity-50 animate-ping" style={{ animationDuration: '2s' }}></div>
                            <div className="absolute inset-0 rounded-full border-2 border-current opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>
                        </>
                    )}

                    <div className="flex flex-col items-center text-center z-10">
                        {isMonitoring ? (
                            <>
                                <span className="text-4xl mb-2">{status === 'cry' ? '😭' : status === 'alert' ? '👀' : '😴'}</span>
                                <h3 className="font-bold text-lg leading-tight">{statusText}</h3>
                                {status === 'cry' && (
                                    <p className="text-red-600 font-bold text-xs mt-2 animate-pulse">ALERTA EM {8 - emergencyTimer}s</p>
                                )}
                            </>
                        ) : (
                            <>
                                <span className="text-4xl mb-2">🛑</span>
                                <h3 className="font-bold text-gray-400">Monitor Desligado</h3>
                            </>
                        )}
                    </div>
                </div>

                {/* Sound Wave Visualization (Simulated CSS) */}
                <div className="flex items-end justify-center gap-1 h-12 w-full max-w-xs">
                    {[...Array(10)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-2 rounded-t-lg transition-all duration-100 ${status === 'cry' ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ 
                                height: isMonitoring ? `${Math.max(10, Math.min(100, noiseLevel * (Math.random() * 2)))}%` : '10%',
                                opacity: isMonitoring ? 1 : 0.3
                            }}
                        ></div>
                    ))}
                </div>

                {/* Controls */}
                <div className="w-full max-w-sm space-y-4">
                    {!isMonitoring ? (
                        <button 
                            onClick={startMonitoring}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                        >
                            <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                            ATIVAR MONITOR
                        </button>
                    ) : (
                        <button 
                            onClick={stopMonitoring}
                            className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-500 font-bold text-lg hover:bg-slate-50 transition-colors"
                        >
                            DESATIVAR
                        </button>
                    )}

                    <div className="bg-white/60 p-4 rounded-2xl text-center border border-white/50">
                         <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Contato de Emergência</p>
                         <p className="text-lg font-bold text-indigo-900">{emergencyContact.name}</p>
                         <p className="text-sm text-indigo-700">{emergencyContact.number}</p>
                    </div>
                </div>

                {/* Voice Interaction Hint */}
                <div 
                    onClick={startVoiceSession}
                    className="cursor-pointer bg-white/80 p-3 rounded-full flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                        <BabyIcon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-pink-800">Dica: Peça para a Sync contar uma história...</p>
                </div>

            </main>
        </div>
    );
};
