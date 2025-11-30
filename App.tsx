
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, Modality, Blob } from '@google/genai';
import { SYSTEM_INSTRUCTION, LIVE_MODEL_NAME, KIDS_COMPANION_INSTRUCTION, ENGLISH_TUTOR_INSTRUCTION, CHEF_INSTRUCTION, CFO_INSTRUCTION, ORGANIZER_INSTRUCTION, SHOPPING_INSTRUCTION } from './constants';
import type { View, Message, Session, Contact, Language } from './types';
import { decode, encode, decodeAudioData } from './utils';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { TextChat } from './components/TextChat';
import { Shopping } from './components/Shopping';
import { Family } from './components/Family';
import { Finances } from './components/Finances';
import { Tasks } from './components/Tasks';
import { Inventory } from './components/Inventory';
import { Learning } from './components/Learning';
import { EnglishCourse } from './components/EnglishCourse';
import { SyncKids } from './components/SyncKids';
import { Essence } from './components/Essence';
import { Babysitter } from './components/Babysitter';
import { MenuIcon, PhoneIcon } from './components/Icons';
import { Nutritionist } from './components/Nutritionist';
import { PersonalTrainer } from './components/PersonalTrainer';
import { GlobalVoiceControl } from './components/GlobalVoiceControl';
import { ShareModal } from './components/ShareModal';
import { Login } from './components/Login';
import { PremiumModal } from './components/PremiumModal';
import { LanguageModal } from './components/LanguageModal';

declare global {
  interface AIStudio {
    getShareableUrl: () => Promise<string>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeView, setActiveView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [appState, setAppState] = useState<'sleeping' | 'active'>('sleeping');
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'speaking' | 'thinking'>('idle');
  const [currentUserTurn, setCurrentUserTurn] = useState('');
  const [currentModelTurn, setCurrentModelTurn] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState('');
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [premiumFeatureName, setPremiumFeatureName] = useState('');
  const [activeCall, setActiveCall] = useState<{ contact: string, status: string, sid?: string, color?: string } | null>(null);
  
  // Language State
  const [nativeLanguage, setNativeLanguage] = useState<Language>('pt-BR');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const sessionRef = useRef<Promise<Session> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const currentResponseTextRef = useRef<string>('');

  useEffect(() => {
    let interval: any;
    if (activeCall && activeCall.sid) {
        interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/twilio-status?sid=${activeCall.sid}`);
                const data = await res.json();
                if (data.status === 'in-progress') setActiveCall(prev => prev ? { ...prev, status: 'Conectado! Em conversa.', color: 'bg-green-600' } : null);
                else if (data.status === 'completed') { setActiveCall(prev => prev ? { ...prev, status: 'Chamada Finalizada.', color: 'bg-gray-800' } : null); clearInterval(interval); setTimeout(() => setActiveCall(null), 3000); }
                else if (['busy', 'failed', 'no-answer'].includes(data.status)) { setActiveCall(prev => prev ? { ...prev, status: `Não atendeu (${data.status})`, color: 'bg-red-600' } : null); clearInterval(interval); setTimeout(() => setActiveCall(null), 4000); }
            } catch (e) { console.error("Erro no polling:", e); }
        }, 2000); 
    }
    return () => clearInterval(interval);
  }, [activeCall?.sid]);

  useEffect(() => {
    const storedUser = localStorage.getItem('async_user');
    const storedLang = localStorage.getItem('async_lang') as Language;
    
    if (storedUser) { setUserName(storedUser); setIsAuthenticated(true); }
    if (storedLang) { setNativeLanguage(storedLang); }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const chatSession = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction: SYSTEM_INSTRUCTION } });
      setChat(chatSession);
    } catch (e) { setError(e instanceof Error ? `Initialization Error: ${e.message}` : "An unknown initialization error occurred."); }
    return () => { stopVoiceSession(false); };
  }, []);

  const handleLogin = (name: string) => { localStorage.setItem('async_user', name); setUserName(name); setIsAuthenticated(true); };

  const handleLanguageChange = (lang: Language) => {
      setNativeLanguage(lang);
      localStorage.setItem('async_lang', lang);
      // If voice is active, restart it to apply new prompt
      if (appState === 'active') {
          stopVoiceSession(false);
          setTimeout(() => startVoiceSession(), 500);
      }
  };

  const executeAICommand = async (jsonString: string) => {
      try {
          const command = JSON.parse(jsonString);
          console.log("Executando comando IA:", command);
          if (command.action === 'whatsapp') {
             const url = `https://wa.me/?text=${encodeURIComponent(command.message)}`; 
             window.open(url, '_blank');
          } else if (command.action === 'call') {
             setActiveCall({ contact: command.contact, status: 'Chamando...', color: 'bg-black' });
          }
      } catch (e) { console.error("Falha comando IA", e); }
  };

  const playAudioData = async (audioData: string) => {
    if (!outputAudioContextRef.current) { outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }); }
    const ctx = outputAudioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    setVoiceState('speaking');
    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
    const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.addEventListener('ended', () => { sourcesRef.current.delete(source); if (sourcesRef.current.size === 0 && !sessionRef.current) setVoiceState('idle'); });
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    sourcesRef.current.add(source);
  };

  const stopVoiceSession = async (changeState: boolean = true) => {
    if (changeState) { setAppState('sleeping'); setVoiceState('idle'); }
    if (sessionRef.current) { try { const session = await sessionRef.current; session.close(); } catch (e) { console.warn("Error closing voice session:", e); } finally { sessionRef.current = null; } }
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null; scriptProcessorRef.current?.disconnect(); scriptProcessorRef.current = null; sourcesRef.current.forEach(source => source.stop()); sourcesRef.current.clear(); nextStartTimeRef.current = 0; currentResponseTextRef.current = '';
  };

  const startVoiceSession = async () => {
    if (appState === 'active') { stopVoiceSession(); return; }
    setAppState('active'); setError(null); currentResponseTextRef.current = '';
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Media Devices API not supported.');
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const currentUser = localStorage.getItem('async_user') || 'Usuário';
      
      // LOGICA DE PERSONA DINÂMICA
      let baseInstruction = SYSTEM_INSTRUCTION;
      let startupMessage = `Say 'Olá ${currentUser}! O que vamos fazer agora?'`;

      switch (activeView) {
          case 'sync-kids':
              baseInstruction = KIDS_COMPANION_INSTRUCTION;
              startupMessage = `Diga 'Oi amiguinho ${currentUser}! Eu sou a Sync Kids. Vamos brincar?'`;
              break;
          case 'english-course':
              baseInstruction = ENGLISH_TUTOR_INSTRUCTION;
              startupMessage = `Say 'Hello ${currentUser}! I am Teacher Sync. Ready to practice?'`;
              break;
          case 'inventory':
              baseInstruction = CHEF_INSTRUCTION;
              startupMessage = `Diga 'Olá ${currentUser}! Chef Sync na área. Vamos analisar sua geladeira?'`;
              break;
          case 'finances':
              baseInstruction = CFO_INSTRUCTION;
              startupMessage = `Diga 'Olá. Modo CFO ativado. Estou analisando seus gráficos.'`;
              break;
          case 'tasks':
              baseInstruction = ORGANIZER_INSTRUCTION;
              startupMessage = `Diga 'Oi! Modo Organização pronto. O que priorizamos hoje?'`;
              break;
          case 'shopping':
              baseInstruction = SHOPPING_INSTRUCTION;
              startupMessage = `Diga 'Olá! Sync Shopper aqui. O que falta na despensa hoje?'`;
              break;
      }

      // INJEÇÃO DE CONTEXTO DE IDIOMA
      const fullInstruction = `${baseInstruction} \n [CRITICAL CONFIGURATION] The user's NATIVE LANGUAGE is: ${nativeLanguage}. If the user struggles or asks for help, explain in ${nativeLanguage}. However, keep the main roleplay in character (English for Tutor, Portuguese for others). \n [STARTUP: ${startupMessage}]`;
      
      sessionRef.current = ai.live.connect({
          model: LIVE_MODEL_NAME,
          config: { responseModalities: [Modality.AUDIO], inputAudioTranscription: {}, outputAudioTranscription: {}, systemInstruction: fullInstruction },
          callbacks: {
              onopen: () => {
                  setVoiceState('listening');
                  const source = inputAudioContextRef.current!.createMediaStreamSource(mediaStreamRef.current!);
                  scriptProcessorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
                  scriptProcessorRef.current.onaudioprocess = (event) => {
                      const inputData = event.inputBuffer.getChannelData(0);
                      const pcmBlob: Blob = { data: encode(new Uint8Array(new Int16Array(inputData.map(v => v * 32767)).buffer)), mimeType: 'audio/pcm;rate=16000' };
                      sessionRef.current?.then((session) => session.sendRealtimeInput({ media: pcmBlob }));
                  };
                  source.connect(scriptProcessorRef.current);
                  scriptProcessorRef.current.connect(inputAudioContextRef.current!.destination);
              },
              onmessage: async (msg) => {
                  if (msg.serverContent?.outputTranscription?.text) { const text = msg.serverContent.outputTranscription.text; currentResponseTextRef.current += text; }
                  if (msg.serverContent?.turnComplete) {
                      const fullText = currentResponseTextRef.current;
                      const jsonMatch = fullText.match(/```json([\s\S]*?)```/);
                      if (jsonMatch && jsonMatch[1]) executeAICommand(jsonMatch[1]);
                      currentResponseTextRef.current = ''; setCurrentUserTurn(''); setCurrentModelTurn(''); if (sourcesRef.current.size === 0) setVoiceState('idle');
                  }
                  if (msg.serverContent?.inputTranscription) { setVoiceState('listening'); setCurrentUserTurn(prev => prev + msg.serverContent.inputTranscription.text); }
                  const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                  if (audioData) await playAudioData(audioData);
              },
              onerror: (e) => { setError(`Voice error: ${e.message}`); stopVoiceSession(); },
              onclose: () => stopVoiceSession(),
          }
      });
    } catch (e) { setError(e instanceof Error ? `Voice session failed: ${e.message}` : "Unknown voice session error."); stopVoiceSession(); }
  };

  const handleShareApp = async () => {
    try {
        const url = window.location.href;
        setShareUrl(url);
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff`;
        setQrCodeUrl(qrApiUrl);
        setIsShareModalOpen(true);
    } catch (err) { setError("Error sharing."); }
  };

  const handleSetView = (view: View) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const toggleVoiceSession = () => {
      if (appState === 'active') {
          stopVoiceSession();
      } else {
          startVoiceSession();
      }
  };

  // ROTEAMENTO DE COMPONENTES
  const renderActiveView = () => {
    switch(activeView) {
        case 'sync-kids': return <SyncKids />;
        case 'english-course': return <EnglishCourse voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'dashboard': return <Dashboard setView={handleSetView} />;
        case 'finances': return <Finances voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'tasks': return <Tasks voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'inventory': return <Inventory voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'shopping': return <Shopping voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'learning': return <Learning />;
        case 'essence': return <Essence />;
        case 'babysitter': return <Babysitter />;
        case 'text-chat': return <TextChat messages={messages} isLoading={isLoading} error={error} onSendMessage={() => {}} onFeedback={() => {}} onShareApp={() => {}} />;
        case 'nutritionist': return <Nutritionist messages={messages} isLoading={isLoading} error={error} onSendMessage={() => {}} onFeedback={() => {}} onShareApp={() => {}} />;
        case 'personal-trainer': return <PersonalTrainer messages={messages} isLoading={isLoading} error={error} onSendMessage={() => {}} onFeedback={() => {}} onShareApp={() => {}} />;
        case 'family': return <Family />;
        case 'home': default: return <Home appState={appState} voiceState={voiceState} error={error} setView={handleSetView} startVoiceSession={startVoiceSession} onShareApp={handleShareApp} />;
    }
  }

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  return (
    <div className="flex h-screen font-sans overflow-hidden relative">
      {activeCall && (
          <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center text-white bg-black`}>
              <h2 className="text-4xl font-bold mb-4">{activeCall.contact}</h2>
              <p className="text-xl font-medium tracking-wide animate-pulse">{activeCall.status}</p>
              <button className="mt-8 p-5 rounded-full bg-red-600" onClick={() => setActiveCall(null)}><PhoneIcon /></button>
          </div>
      )}
      <div className={`fixed inset-y-0 left-0 w-64 z-30 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeView={activeView} setView={handleSetView} onShareApp={handleShareApp} onOpenLanguage={() => setIsLanguageModalOpen(true)} />
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
      <main className="flex-1 flex flex-col h-full relative font-sans">
        <button onClick={() => setIsSidebarOpen(true)} className="absolute top-5 left-5 z-20 p-2 rounded-full bg-white/10 md:hidden"><MenuIcon /></button>
        {renderActiveView()}
        {appState === 'active' && activeView === 'home' && <GlobalVoiceControl voiceState={voiceState} stopVoiceSession={() => stopVoiceSession(true)} />}
      </main>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} qrDataUrl={qrCodeUrl} shareUrl={shareUrl} title="Compartilhar Async+" />
      <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} featureName={premiumFeatureName} />
      <LanguageModal isOpen={isLanguageModalOpen} onClose={() => setIsLanguageModalOpen(false)} onSelect={handleLanguageChange} currentLang={nativeLanguage} />
    </div>
  );
};
export default App;
