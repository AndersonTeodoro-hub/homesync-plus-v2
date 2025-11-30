
import React, { useState } from 'react';
import { SyncPrimeLogo, LockIcon, UserIcon } from './Icons';

interface LoginProps { onLogin: (userName: string) => void; }

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Digite seu nome.'); return; }
    if (code.toUpperCase() !== 'SYNC2025') { setError('Código inválido.'); return; }
    onLogin(name.trim());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white p-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex flex-col items-center mb-8">
                <SyncPrimeLogo className="w-20 h-20 mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                <h1 className="text-4xl font-black italic tracking-tighter">SYNC <span className="text-blue-500 not-italic">PRIME</span></h1>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">Intelligence OS</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm ml-1 text-gray-400 font-bold uppercase">Nome</label>
                    <input className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-colors" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm ml-1 text-gray-400 font-bold uppercase">Código de Acesso</label>
                    <input type="password" className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-colors" value={code} onChange={e => setCode(e.target.value)} placeholder="Código" />
                </div>
                {error && <p className="text-red-400 text-sm text-center font-bold">{error}</p>}
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 rounded-xl font-bold mt-4 shadow-lg transform hover:scale-[1.02] transition-all">ACESSAR SISTEMA</button>
            </form>
        </div>
    </div>
  );
};
