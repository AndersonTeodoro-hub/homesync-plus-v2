import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { ChatInput } from './ChatInput';
import { NutritionistIcon } from './Icons';

interface NutritionistProps {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    onSendMessage: (message: string) => void;
    onFeedback: any;
    onShareApp: any;
}

export const Nutritionist: React.FC<NutritionistProps> = ({ messages, isLoading, error, onSendMessage, onFeedback }) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => { if (chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; }, [messages, isLoading]);

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-green-600 to-emerald-900 text-white">
            <header className="p-4 bg-black/20 backdrop-blur-md flex items-center gap-3 border-b border-white/10">
                <div className="p-2 bg-green-400/20 rounded-lg text-green-300"><NutritionistIcon /></div>
                <h1 className="text-xl font-bold">Nutricionista IA</h1>
            </header>
            <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 pb-20">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center py-10 opacity-70">
                        <p>Olá! Sou sua Nutricionista. Posso criar planos alimentares, analisar calorias ou sugerir receitas saudáveis. O que vamos comer hoje?</p>
                    </div>
                )}
                {messages.map((msg) => <ChatMessage key={msg.id} message={msg} onFeedback={onFeedback} />)}
                {isLoading && <LoadingSpinner />}
            </main>
            <footer className="p-4 bg-black/20 backdrop-blur-md border-t border-white/10">
                <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
            </footer>
        </div>
    );
};