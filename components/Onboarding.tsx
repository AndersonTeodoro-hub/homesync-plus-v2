
import React, { useState } from 'react';
import { SyncPrimeLogo, ArrowRightIcon, CheckIcon, WaveformIcon, MicIcon, PhoneIcon, ShieldCheckIcon, PlayIcon } from './Icons';

interface OnboardingProps {
    onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState('');
    const [goal, setGoal] = useState('');
    const [voice, setVoice] = useState('');
    const [isMicGranted, setIsMicGranted] = useState(false);
    const [isCallEnabled, setIsCallEnabled] = useState(false);

    const nextStep = () => setStep(prev => prev + 1);

    const requestMic = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsMicGranted(true);
            setTimeout(nextStep, 1000);
        } catch (e) {
            alert("O acesso ao microfone é necessário para a Sync funcionar.");
        }
    };

    const enableCalls = () => {
        setIsCallEnabled(true);
        setTimeout(nextStep, 1000);
    };

    // --- STEP COMPONENTS ---

    // T1: WELCOME
    const Step0 = () => (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <SyncPrimeLogo className="w-24 h-24 mb-8" />
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Bem-vindo ao <br/><span className="text-blue-600">Sync Prime.</span></h1>
            <p className="text-gray-500 text-lg mb-12 max-w-xs">O assistente que sincroniza a sua vida, no seu ritmo.</p>
            <button onClick={nextStep} className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full shadow-lg transition-transform hover:scale-[1.02]">
                Começar
            </button>
        </div>
    );

    // T2: INTRO
    const Step1 = () => (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-8">
                <SyncPrimeLogo className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Eu sou a Sync.</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-sm leading-relaxed">
                Vou ajudar você a organizar, automatizar e resolver o que importa. Sou sua nova inteligência operacional.
            </p>
            <button onClick={nextStep} className="w-full max-w-xs bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-full shadow-lg transition-transform hover:scale-[1.02]">
                Continuar
            </button>
        </div>
    );

    // T3: PROFILE
    const Step2 = () => {
        const options = ['Produtividade', 'Tarefas Diárias', 'Rotinas', 'Vida Pessoal', 'Chamadas Auto', 'Tudo Acima'];
        return (
            <div className="w-full max-w-md animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Como posso ajudar você melhor?</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {options.map((opt) => (
                        <button 
                            key={opt}
                            onClick={() => setProfile(opt)}
                            className={`p-4 rounded-2xl border text-sm font-bold transition-all ${profile === opt ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={nextStep} 
                    disabled={!profile}
                    className="w-full bg-gray-900 disabled:opacity-50 text-white font-bold py-4 rounded-full shadow-lg transition-all"
                >
                    Avançar
                </button>
            </div>
        );
    };

    // T4: GOAL
    const Step3 = () => {
        const goals = ['Organizar minha rotina', 'Lembrar compromissos', 'Automatizar tarefas', 'Reduzir estresse', 'Assistente de voz'];
        return (
            <div className="w-full max-w-md animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Qual é sua prioridade agora?</h2>
                <div className="space-y-3 mb-8">
                    {goals.map((opt) => (
                        <button 
                            key={opt}
                            onClick={() => setGoal(opt)}
                            className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all ${goal === opt ? 'bg-blue-50 border-blue-600 text-blue-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <span className="font-medium">{opt}</span>
                            {goal === opt && <CheckIcon className="w-5 h-5 text-blue-600" />}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={nextStep} 
                    disabled={!goal}
                    className="w-full bg-gray-900 disabled:opacity-50 text-white font-bold py-4 rounded-full shadow-lg transition-all"
                >
                    Continuar
                </button>
            </div>
        );
    };

    // T5: VOICE
    const Step4 = () => {
        const voices = ['Neutra Profissional', 'Calma e Empática', 'Direta e Objetiva', 'Assertiva Premium'];
        return (
            <div className="w-full max-w-md animate-fade-in text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <WaveformIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Escolha o estilo da minha voz.</h2>
                <div className="grid grid-cols-1 gap-3 mb-8">
                    {voices.map((v) => (
                        <button 
                            key={v}
                            onClick={() => setVoice(v)}
                            className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${voice === v ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${voice === v ? 'bg-white/20' : 'bg-gray-100'}`}>
                                <PlayIcon className="w-4 h-4" />
                            </div>
                            <span className="font-bold">{v}</span>
                        </button>
                    ))}
                </div>
                <button 
                    onClick={nextStep} 
                    disabled={!voice}
                    className="w-full bg-blue-600 disabled:opacity-50 text-white font-bold py-4 rounded-full shadow-lg transition-all"
                >
                    Confirmar Voz
                </button>
            </div>
        );
    };

    // T6: MIC PERMISSION
    const Step5 = () => (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in max-w-sm">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-colors ${isMicGranted ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                {isMicGranted ? <CheckIcon className="w-12 h-12" /> : <MicIcon className="w-12 h-12" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Permitir acesso ao microfone</h2>
            <p className="text-gray-500 mb-10">Preciso ouvir você para agir com rapidez e precisão. Seus dados são processados com segurança.</p>
            <button 
                onClick={requestMic} 
                disabled={isMicGranted}
                className={`w-full font-bold py-4 rounded-full shadow-lg transition-all ${isMicGranted ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
                {isMicGranted ? 'Microfone Ativado' : 'Ativar Microfone'}
            </button>
        </div>
    );

    // T7: CALL PERMISSION
    const Step6 = () => (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in max-w-sm">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-colors ${isCallEnabled ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                {isCallEnabled ? <ShieldCheckIcon className="w-12 h-12" /> : <PhoneIcon className="w-12 h-12" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Habilitar chamadas automáticas</h2>
            <p className="text-gray-500 mb-10">Com essa permissão, posso ligar para contatos, médicos, familiares ou qualquer pessoa quando você pedir.</p>
            <button 
                onClick={enableCalls} 
                disabled={isCallEnabled}
                className={`w-full font-bold py-4 rounded-full shadow-lg transition-all ${isCallEnabled ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
                {isCallEnabled ? 'Chamadas Habilitadas' : 'Habilitar Chamadas'}
            </button>
        </div>
    );

    // T8: FIRST ACTION
    const Step7 = () => (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vamos começar com algo simples.</h2>
            <p className="text-gray-500 mb-8">Peça algo que gostaria que eu fizesse agora.</p>
            
            <div className="space-y-4 w-full mb-10">
                {['"Sync, me lembre de beber água às 21h."', '"Sync, ligue para minha esposa."', '"Sync, o que tenho amanhã?"'].map((ex, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-600 italic">
                        {ex}
                    </div>
                ))}
            </div>

            <button onClick={nextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2">
                <MicIcon className="w-5 h-5" /> Falar com a Sync
            </button>
        </div>
    );

    // T9: TRANSITION
    const Step8 = () => {
        // Auto advance
        React.useEffect(() => {
            const timer = setTimeout(nextStep, 3000);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-8"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configurando seu ambiente...</h2>
                <p className="text-gray-500">Preparando sua assistente inteligente</p>
            </div>
        );
    };

    // T10: FINAL
    const Step9 = () => (
        <div className="flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
                <CheckIcon className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Tudo pronto.</h2>
            <p className="text-gray-500 text-lg mb-12">Seu sistema operacional está ativo.</p>
            <button onClick={onComplete} className="w-full max-w-xs bg-black text-white font-bold py-4 rounded-full shadow-xl transition-transform hover:scale-[1.05]">
                Usar Sync Prime
            </button>
        </div>
    );

    const steps = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9];
    const CurrentComponent = steps[step];

    return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col font-sans">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-100">
                <div 
                    className="h-full bg-blue-600 transition-all duration-500 ease-out" 
                    style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                ></div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
                <CurrentComponent />
            </div>

            {/* Footer / Skip (Optional, keeping clean for now) */}
            <div className="p-6 text-center">
                <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Sync Prime Setup • {step + 1}/{steps.length}</p>
            </div>
        </div>
    );
};
