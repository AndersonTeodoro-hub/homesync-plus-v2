
import React from 'react';
import { Avatar } from './Avatar';

interface ModuleHeaderProps {
    title: string;
    icon: React.ReactNode;
    voiceState: 'idle' | 'listening' | 'speaking' | 'thinking';
    gradientFrom: string;
    gradientTo: string;
    onAvatarClick: () => void;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title, icon, voiceState, gradientFrom, gradientTo, onAvatarClick }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-md border-b border-white/10 relative z-20">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white shadow-lg`}>
                    {icon}
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
            </div>
            
            {/* Sync Miniature - Interactive Voice Trigger */}
            <button 
                onClick={onAvatarClick}
                className="w-12 h-16 relative group cursor-pointer focus:outline-none"
                aria-label="Ativar voz da Sync neste módulo"
            >
                <div className={`absolute inset-0 scale-[0.35] origin-top-right right-0 -top-2 transition-transform duration-300 ${voiceState !== 'idle' ? 'scale-[0.45]' : 'group-hover:scale-[0.4]'}`}>
                    <Avatar role="model" isSleeping={false} voiceState={voiceState} />
                </div>
                
                {/* Visual Indicators */}
                {voiceState === 'listening' && (
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full animate-ping shadow-[0_0_10px_#22c55e]"></div>
                )}
                {voiceState === 'speaking' && (
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                )}
                {voiceState === 'idle' && (
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30 rounded-full group-hover:bg-white transition-colors"></div>
                )}
            </button>
        </header>
    );
};
