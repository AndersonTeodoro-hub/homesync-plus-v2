import React, { useState } from 'react';
import { AsyncLogoIcon, LockIcon, UserIcon } from './Icons';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex flex-col items-center mb-8">
                <AsyncLogoIcon className="w-20 h-20 mb-4" />
                <h1 className="text-3xl font-bold">Async+ Beta</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm ml-1">Nome</label>
                    <input className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm ml-1">Código de Acesso</label>
                    <input type="password" className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white" value={code} onChange={e => setCode(e.target.value)} placeholder="Código" />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-purple-600 py-3 rounded-xl font-bold mt-4">Entrar</button>
            </form>
        </div>
    </div>
  );
};