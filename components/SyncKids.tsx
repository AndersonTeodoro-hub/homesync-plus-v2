import React, { useState } from 'react';
import { BalloonIcon, BookIcon, PlayCircleIcon, HeartIcon, LoadingSpinnerIcon } from './Icons';

export const SyncKids: React.FC = () => {
  return (
    <div className="flex-1 bg-gradient-to-b from-orange-300 via-pink-300 to-purple-400 p-6 h-full flex flex-col items-center justify-center text-center">
        <div className="bg-white/30 p-4 rounded-full mb-8 animate-bounce">
            <BalloonIcon />
        </div>
        <h1 className="text-4xl font-black text-white drop-shadow-md mb-4">Sync Kids</h1>
        <p className="text-xl text-white font-medium max-w-md mb-12">Oi amiguinho! Clique no microfone abaixo para a gente brincar e ouvir histórias!</p>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-sm border-2 border-white/40">
                <BookIcon />
                <span className="block mt-2 font-bold text-white">Histórias</span>
            </div>
            <div className="bg-white/20 p-6 rounded-3xl backdrop-blur-sm border-2 border-white/40">
                <PlayCircleIcon />
                <span className="block mt-2 font-bold text-white">Brincar</span>
            </div>
        </div>
    </div>
  );
};