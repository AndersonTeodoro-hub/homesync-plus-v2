// types.ts – Tipagens da aplicação

export type View =
  | "home"
  | "dashboard"
  | "shopping"
  | "family"
  | "finances"
  | "tasks"
  | "inventory"
  | "learning"
  | "english-course"
  | "sync-kids"
  | "essence"
  | "babysitter"
  | "nutritionist"
  | "personal-trainer"
  | "text-chat";

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
}

export interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  whatsapp?: string;
  email?: string;
}

export type Language = "pt-BR" | "pt-PT" | "en-US" | "es-ES";

export interface Session {
  close: () => void;
  sendRealtimeInput: (data: any) => void;
}
