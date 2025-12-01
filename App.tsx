// ---------- PARTE 1 ----------
// Importações principais
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI, Chat, Modality } from '@google/generative-ai';

// Importações internas
import { 
  SYSTEM_INSTRUCTION, LIVE_MODEL_NAME, KIDS_COMPANION_INSTRUCTION,
  ENGLISH_TUTOR_INSTRUCTION, CHEF_INSTRUCTION, CFO_INSTRUCTION,
  ORGANIZER_INSTRUCTION, SHOPPING_INSTRUCTION, BABYSITTER_INSTRUCTION
} from './constants';

import type { View, Message, Session, Contact, Language } from './types';

import { decode, encode, decodeAudioData } from './utils';

// Componentes
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
  interface Window {
    deferredPrompt?: any;
  }
}

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const [userName, setUserName] = useState('');
  const [activeView, setActiveView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Estados do assistente
  const [appState, setAppState] = useState<'sleeping' | 'active'>('sleeping');
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'speaking' | 'thinking'>('idle');

  const [activeCall, setActiveCall] = useState<any>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  const [nativeLanguage, setNativeLanguage] = useState<Language>('pt-BR');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Referências de áudio/sessão
  const sessionRef = useRef<Promise<Session> | null>(null);
  const mediaRef = useRef<MediaStream | null>(null);
  const inputCtx = useRef<AudioContext | null>(null);
  const outputCtx = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioSources = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStart = useRef<number>(0);
  const partialText = useRef<string>('');

// ---------- PARTE 2 ----------

// Instalar PWA
useEffect(() => {
  const handlePrompt = (e: any) => {
    e.preventDefault();
    setInstallPrompt(e);
    window.deferredPrompt = e;
  };
  window.addEventListener("beforeinstallprompt", handlePrompt);
  return () => window.removeEventListener("beforeinstallprompt", handlePrompt);
}, []);

const handleInstallClick = () => {
  if (installPrompt) {
    installPrompt.prompt();
    installPrompt.userChoice.then(() => setInstallPrompt(null));
  }
};

// Login + Onboarding
useEffect(() => {
  const storedUser = localStorage.getItem('async_user');
  const storedLang = localStorage.getItem('async_lang') as Language;
  const storedOnboard = localStorage.getItem('sync_onboarding_complete');

  if (storedUser) {
    setUserName(storedUser);
    setIsAuthenticated(true);
    setShowLanding(false);
  }
  if (storedLang) setNativeLanguage(storedLang);
  if (storedOnboard === 'true') setHasOnboarded(true);
}, []);

const handleLogin = (name: string) => {
  localStorage.setItem('async_user', name);
  setUserName(name);
  setIsAuthenticated(true);
};

const handleOnboardingComplete = () => {
  localStorage.setItem('sync_onboarding_complete', 'true');
  setHasOnboarded(true);
};

// Alterar idioma
const handleLanguageChange = (lang: Language) => {
  localStorage.setItem('async_lang', lang);
  setNativeLanguage(lang);
};

// ---------- PARTE 3 ----------

// Tocar áudio gerado pela IA
const playAudio = async (base64: string) => {
  if (!outputCtx.current) {
    outputCtx.current = new AudioContext({ sampleRate: 24000 });
  }

  const ctx = outputCtx.current;
  if (ctx.state === 'suspended') await ctx.resume();

  setVoiceState('speaking');

  const data = decode(base64);
  const buffer = await decodeAudioData(data, ctx, 24000, 1);

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);

  source.onended = () => {
    audioSources.current.delete(source);
    if (audioSources.current.size === 0) setVoiceState('idle');
  };

  source.start(nextStart.current);
  nextStart.current += buffer.duration;
  audioSources.current.add(source);
};

// Encerrar sessão de voz
const stopVoiceSession = async () => {
  setAppState('sleeping');
  setVoiceState('idle');

  if (sessionRef.current) {
    try {
      const s = await sessionRef.current;
      await s.close();
    } catch {}
    sessionRef.current = null;
  }

  mediaRef.current?.getTracks().forEach(t => t.stop());
  mediaRef.current = null;

  processorRef.current?.disconnect();
  processorRef.current = null;

  audioSources.current.forEach(s => s.stop());
  audioSources.current.clear();
  nextStart.current = 0;
  partialText.current = '';
};

// Iniciar GEMINI LIVE
const startVoiceSession = async () => {
  try {
    setAppState('active');
    setError(null);

    mediaRef.current = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
    });

    inputCtx.current = new AudioContext({ sampleRate: 16000 });
    outputCtx.current = new AudioContext({ sampleRate: 24000 });

    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("VITE_API_KEY não encontrada.");

    const ai = new GoogleGenerativeAI({ apiKey });

    const sys = SYSTEM_INSTRUCTION;
    const session = ai.live.connect({
      model: LIVE_MODEL_NAME,
      config: { responseModalities: [Modality.AUDIO], systemInstruction: sys },
      callbacks: {
        onopen: () => {
          const src = inputCtx.current!.createMediaStreamSource(mediaRef.current!);
          processorRef.current = inputCtx.current!.createScriptProcessor(4096, 1, 1);

          processorRef.current.onaudioprocess = e => {
            const input = e.inputBuffer.getChannelData(0);
            const pcm = new Int16Array(input.map(v => v * 32767));
            session.sendRealtimeInput({
              media: { data: encode(new Uint8Array(pcm.buffer)), mimeType: "audio/pcm" }
            });
          };

          src.connect(processorRef.current);
          processorRef.current.connect(inputCtx.current!.destination);
        },

        onmessage: async msg => {
          if (msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
            await playAudio(msg.serverContent.modelTurn.parts[0].inlineData.data);
          }
        },

        onerror: err => {
          setError(err.message);
          stopVoiceSession();
        },

        onclose: () => stopVoiceSession()
      }
    });

    sessionRef.current = Promise.resolve(session);

  } catch (err: any) {
    setError(err.message);
    stopVoiceSession();
  }
};
// ---------- PARTE 4 ----------

const handleSetView = (v: View) => {
  setActiveView(v);
  setIsSidebarOpen(false);
};

if (showLanding && !isAuthenticated) {
  return <LandingPage onEnter={() => setShowLanding(false)} installPrompt={installPrompt} onInstall={handleInstallClick} />;
}

if (!isAuthenticated) return <Login onLogin={handleLogin} />;
if (!hasOnboarded) return <Onboarding onComplete={handleOnboardingComplete} />;

return (
  <div className="flex h-screen overflow-hidden">
    {activeCall && (
      <div className="fixed inset-0 flex items-center justify-center text-white bg-black z-50">
        <h2>{activeCall.contact}</h2>
        <p>{activeCall.status}</p>
        <button onClick={() => setActiveCall(null)}><PhoneIcon /></button>
      </div>
    )}

    <div className={`fixed inset-y-0 left-0 w-64 z-20 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
      <Sidebar activeView={activeView} setView={handleSetView} />
    </div>

    <main className="flex-1 relative">
      {activeView === 'home' && <Home startVoiceSession={startVoiceSession} appState={appState} />}
      {activeView === 'sync-kids' && <SyncKids startVoiceSession={startVoiceSession} />}
      {activeView === 'english-course' && <EnglishCourse startVoiceSession={startVoiceSession} />}
      {activeView === 'dashboard' && <Dashboard setView={handleSetView} />}
      {activeView === 'finances' && <Finances startVoiceSession={startVoiceSession} />}
      {activeView === 'tasks' && <Tasks startVoiceSession={startVoiceSession} />}
      {activeView === 'inventory' && <Inventory startVoiceSession={startVoiceSession} />}
      {activeView === 'shopping' && <Shopping startVoiceSession={startVoiceSession} />}
      {activeView === 'learning' && <Learning />}
      {activeView === 'essence' && <Essence />}
      {activeView === 'babysitter' && <Babysitter startVoiceSession={startVoiceSession} />}
      {activeView === 'text-chat' && <TextChat messages={messages} />}
      {activeView === 'family' && <Family />}
    </main>

    <LanguageModal isOpen={isLanguageModalOpen} onClose={() => setIsLanguageModalOpen(false)} onSelect={handleLanguageChange} />
  </div>
);

};

export default App;
