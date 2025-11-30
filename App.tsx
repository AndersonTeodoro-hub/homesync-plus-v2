
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, Modality, Blob } from '@google/genai';
import { SYSTEM_INSTRUCTION, LIVE_MODEL_NAME, KIDS_COMPANION_INSTRUCTION, ENGLISH_TUTOR_INSTRUCTION, CHEF_INSTRUCTION, CFO_INSTRUCTION, ORGANIZER_INSTRUCTION, SHOPPING_INSTRUCTION, BABYSITTER_INSTRUCTION } from './constants';
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
import { LandingPage } from './components/LandingPage';
import { Onboarding } from './components/Onboarding';

declare global {
  interface AIStudio {
    getShareableUrl: () => Promise<string>;
  }
  interface Window {
    aistudio?: AIStudio;
    deferredPrompt?: any;
  }
}

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false); // New Onboarding State
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

  // PWA Install Prompt State
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  const sessionRef = useRef<Promise<Session> | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const currentResponseTextRef = useRef<string>('');

  useEffect(() => {
    // Listen for PWA install event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      window.deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setInstallPrompt(null);
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    }
  };

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
    const storedOnboarding = localStorage.getItem('sync_onboarding_complete');
    
    if (storedUser) { 
        setUserName(storedUser); 
        setIsAuthenticated(true); 
        setShowLanding(false); 
    }
    if (storedLang) { setNativeLanguage(storedLang); }
    if (storedOnboarding === 'true') { setHasOnboarded(true); }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const chatSession = ai.chats.create({ model: 'gemini-2.5-flash', config: { systemInstruction: SYSTEM_INSTRUCTION } });
      setChat(chatSession);
    } catch (e) { setError(e instanceof Error ? `Initialization Error: ${e.message}` : "An unknown initialization error occurred."); }
    return () => { stopVoiceSession(false); };
  }, []);

  const handleLogin = (name: string) => { localStorage.setItem('async_user', name); setUserName(name); setIsAuthenticated(true); };

  const handleOnboardingComplete = () => {
      localStorage.setItem('sync_onboarding_complete', 'true');
      setHasOnboarded(true);
  };

  const handleLogout = () => {
      localStorage.removeItem('async_user');
      // We don't reset onboarding so they don't see it again every logout, unless we want strict reset.
      // Keeping onboarding state persists profile. To reset strictly: localStorage.removeItem('sync_onboarding_complete');
      setIsAuthenticated(false);
      setUserName('');
      setShowLanding(true);
      setActiveView('home');
  };

  const handleLanguageChange = (lang: Language) => {
      setNativeLanguage(lang);
      localStorage.setItem('async_lang', lang);
      if (appState === 'active') {
          stopVoiceSession(false);
          setTimeout(() => startVoiceSession(), 500);
      }
  };

  // --- Helper: Find Contact ---
  const findContactNumber = (name: string): string | null => {
      try {
          const saved = localStorage.getItem('familyContacts');
          const defaultContacts: Contact[] = [
            { id: 1, name: 'Cris', relationship: 'Esposa', phone: '5511999999999', whatsapp: '5511999999999', email: 'cris@email.com' },
            { id: 2, name: 'Filho', relationship: 'Filho', phone: '5511988888888', whatsapp: '5511988888888', email: '' }
          ];
          
          const contacts: Contact[] = saved ? JSON.parse(saved) : defaultContacts;
          const contact = contacts.find(c => c.name.toLowerCase().includes(name.toLowerCase()));
          
          if (!contact) return null;

          let cleanNumber = contact.phone.replace(/[^0-9+]/g, '');
          if (!cleanNumber.startsWith('+')) {
              cleanNumber = '+55' + cleanNumber;
          }
          return cleanNumber;
      } catch {
          return null;
      }
  };

  // --- Helper: Execute AI Action Command ---
  const executeAICommand = async (jsonString: string) => {
      try {
          const command = JSON.parse(jsonString);
          console.log("Executando comando IA:", command);

          // Add to message history for Dashboard
          const newMessage: Message = {
              id: Date.now().toString(),
              role: 'model',
              text: command.action === 'whatsapp' ? `Enviando WhatsApp para ${command.contact}...` : `Ligando para ${command.contact}...`,
              timestamp: Date.now()
          };
          setMessages(prev => [...prev, newMessage]);

          if (command.action === 'whatsapp') {
              const contactNumber = findContactNumber(command.contact);
              
              if (contactNumber) {
                  const waNumber = contactNumber.replace('+', '');
                  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(command.message)}`;
                  
                  setTimeout(() => {
                      window.open(url, '_blank');
                  }, 2000);
              } else {
                  console.warn(`Contato não encontrado: ${command.contact}`);
                  setTimeout(() => setActiveView('family'), 2000);
              }
          } 
          else if (command.action === 'call') {
              const contactNumber = findContactNumber(command.contact);
              const contactName = command.contact;

              if (contactNumber) {
                  setActiveCall({ contact: contactName, status: 'Iniciando discagem...', color: 'bg-black' });

                  try {
                      const response = await fetch('/api/twilio-webhook', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                              to: contactNumber,
                              message: `Olá ${contactName}. Aqui é a Async Plus. ${command.context || 'Tenho um recado importante.'}`
                          })
                      });

                      const data = await response.json();

                      if (data.mode === 'real') {
                          setActiveCall({ contact: contactName, status: 'Chamando via Rede Telefônica...', sid: data.sid, color: 'bg-yellow-900' });
                      } else {
                          setActiveCall({ contact: contactName, status: 'Simulando Chamada (Modo Beta)...', color: 'bg-blue-900' });
                          setTimeout(() => setActiveCall(null), 6000);
                      }

                  } catch (err) {
                      console.log("Call fallback:", err);
                      setActiveCall({ contact: contactName, status: 'Erro na conexão.', color: 'bg-red-900' });
                      setTimeout(() => setActiveCall(null), 4000);
                  }
              } else {
                  alert(`Não encontrei o número de ${command.contact}. Por favor, adicione em Família.`);
                  setActiveView('family');
              }
          }
      } catch (e) {
          console.error("Falha ao processar comando JSON da IA", e);
      }
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
              startupMessage = `Diga 'Oi amiguinho ${currentUser}! Eu sou a Sync Kids. Vamos começar nossa aventura?'`;
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
          case 'babysitter':
              baseInstruction = BABYSITTER_INSTRUCTION;
              startupMessage = `Diga 'Olá! Sync Nanny ativa. O ambiente está seguro. Quer que eu conte uma história?'`;
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
                  if (msg.serverContent?.outputTranscription?.text) { 
                      const text = msg.serverContent.outputTranscription.text; 
                      currentResponseTextRef.current += text;
                  }
                  if (msg.serverContent?.turnComplete) {
                      const fullText = currentResponseTextRef.current;
                      const jsonMatch = fullText.match(/```json([\s\S]*?)```/);
                      
                      // Add User/Model turn to history
                      if (fullText) {
                          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: fullText, timestamp: Date.now() }]);
                      }

                      if (jsonMatch && jsonMatch[1]) executeAICommand(jsonMatch[1]);
                      currentResponseTextRef.current = ''; setCurrentUserTurn(''); setCurrentModelTurn(''); if (sourcesRef.current.size === 0) setVoiceState('idle');
                  }
                  if (msg.serverContent?.inputTranscription) { 
                      setVoiceState('listening'); 
                      // Real-time input transcription can be handled here if needed to show "User is speaking..."
                  }
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
        case 'sync-kids': return <SyncKids voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'english-course': return <EnglishCourse voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'dashboard': return <Dashboard setView={handleSetView} />;
        case 'finances': return <Finances voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'tasks': return <Tasks voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'inventory': return <Inventory voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'shopping': return <Shopping voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'learning': return <Learning />;
        case 'essence': return <Essence />;
        case 'babysitter': return <Babysitter voiceState={voiceState} startVoiceSession={toggleVoiceSession} />;
        case 'text-chat': return <TextChat messages={messages} isLoading={isLoading} error={error} onSendMessage={() => {}} onFeedback={() => {}} onShareApp={() => {}} />;
        case 'nutritionist': return <Nutritionist messages={messages} isLoading={isLoading} error={error} onSendMessage={() => {}} onFeedback={() => {}} onShareApp={() => {}} />;
        case 'personal-trainer': return <PersonalTrainer messages={messages} isLoading={isLoading} error={error} onSendMessage={() => {}} onFeedback={() => {}} onShareApp={() => {}} />;
        case 'family': return <Family />;
        case 'home': default: return <Home appState={appState} voiceState={voiceState} error={error} setView={handleSetView} startVoiceSession={startVoiceSession} onShareApp={handleShareApp} onOpenLanguage={() => setIsLanguageModalOpen(true)} installPrompt={installPrompt} messages={messages} userName={userName} />;
    }
  }

  // --- 1. LANDING PAGE (Gate) ---
  if (showLanding && !isAuthenticated) {
      return <LandingPage onEnter={() => setShowLanding(false)} installPrompt={installPrompt} onInstall={handleInstallClick} />;
  }

  // --- 2. AUTHENTICATION ---
  if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
  }

  // --- 3. ONBOARDING (Gate) ---
  if (!hasOnboarded) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // --- 4. MAIN APP ---
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
        <Sidebar activeView={activeView} setView={handleSetView} onShareApp={handleShareApp} />
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
