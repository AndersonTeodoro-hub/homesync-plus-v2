export type View = 'home' | 'dashboard' | 'family' | 'shopping' | 'text-chat' | 'finances' | 'tasks' | 'inventory' | 'learning' | 'english-course' | 'sync-kids' | 'essence' | 'babysitter' | 'nutritionist' | 'personal-trainer';

export type Language = 'pt-BR' | 'en-US' | 'es-ES';

export interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export interface Contact {
    id: number;
    name: string;
    relationship: string;
    phone: string;
    whatsapp: string;
    email: string;
}

export interface Session {
    sendRealtimeInput: (input: { media: { data: string; mimeType: string } }) => void;
    close: () => void;
}