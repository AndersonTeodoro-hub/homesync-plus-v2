
import React, { useState } from 'react';
import { SyncPrimeLogo, PhoneIcon, MicIcon, CheckIcon, ArrowRightIcon, ChevronDownIcon, CloseIcon, StarIcon, DownloadIcon } from './Icons';

interface LandingPageProps {
    onEnter: () => void;
    installPrompt?: any;
    onInstall?: () => void;
}

type Currency = 'EUR' | 'USD' | 'BRL';

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, installPrompt, onInstall }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [currency, setCurrency] = useState<Currency>('BRL'); // Default to Brazil based on language

    const toggleFaq = (idx: number) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const currencySymbol = {
        'EUR': '€',
        'USD': '$',
        'BRL': 'R$'
    };

    const pricingData = {
        'EUR': { free: '0', personal: '9,99', premium: '14,99', family: '19,99' },
        'USD': { free: '0', personal: '9.99', premium: '14.99', family: '19.99' },
        'BRL': { free: '0', personal: '24,90', premium: '39,90', family: '59,90' }
    };

    return (
        <div className="bg-white text-gray-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
            
            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <SyncPrimeLogo className="w-10 h-10" />
                            <span className="font-bold text-2xl tracking-tight text-gray-900">Sync Prime</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                            <a href="#features" className="hover:text-blue-600 transition-colors">Recursos</a>
                            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Como Funciona</a>
                            <a href="#pricing" className="hover:text-blue-600 transition-colors">Planos</a>
                        </div>
                        <div className="flex items-center gap-3">
                             {installPrompt && (
                                <button 
                                    onClick={onInstall}
                                    className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-md"
                                >
                                    <DownloadIcon className="w-4 h-4" /> Baixar App
                                </button>
                             )}
                            <button 
                                onClick={onEnter}
                                className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Disponível Globalmente (Beta VIP)</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
                        Sync Prime. O assistente <br/><span className="text-blue-600">que resolve por você.</span>
                    </h1>
                    
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        IA + Voz + Ações Reais. Mais do que responder perguntas, a Sync liga para contatos, agenda compromissos e automatiza sua vida. 
                        <span className="block mt-2 font-medium text-gray-900">Menos esforço. Mais vida.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        {installPrompt ? (
                            <button 
                                onClick={onInstall}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <DownloadIcon className="w-5 h-5" /> Baixar Aplicativo
                            </button>
                        ) : (
                             <button 
                                onClick={onEnter}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Começar Agora <ArrowRightIcon className="w-5 h-5" />
                            </button>
                        )}
                        
                        <button 
                            onClick={onEnter}
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-bold text-lg transition-all"
                        >
                            Ver Demonstração
                        </button>
                    </div>

                    {/* Mockup Placeholder */}
                    <div className="relative mx-auto max-w-5xl rounded-[3rem] bg-gray-900 p-4 shadow-2xl border-8 border-gray-900">
                        <div className="aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-800 relative group cursor-pointer" onClick={onEnter}>
                             <img 
                                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2881&auto=format&fit=crop" 
                                alt="App Dashboard" 
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                             />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/40">
                                        <MicIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="text-white font-medium text-lg">"Sync, ligue para a Anna e avise que vou atrasar."</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- VALUE PROP --- */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Seu tempo é valioso. Automatize o resto.</h2>
                        <p className="text-gray-500">
                            A maioria das IAs apenas fala. A Sync executa. Conectamos inteligência artificial a ações do mundo real.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Ligações Reais', desc: 'A Sync liga para restaurantes, médicos ou familiares por você.', icon: <PhoneIcon /> },
                            { title: 'Voz Humana', desc: 'Converse naturalmente. Ela entende contexto, ironia e emoção.', icon: <MicIcon /> },
                            { title: 'Automação Total', desc: 'Do mercado às finanças, ela gerencia os detalhes chatos.', icon: <CheckIcon /> },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS --- */}
            <section id="how-it-works" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Como funciona a mágica</h2>
                            <div className="space-y-8">
                                {[
                                    { step: '01', title: 'Você Fala', desc: 'Use voz natural, como se falasse com uma pessoa.' },
                                    { step: '02', title: 'Ela Entende', desc: 'A IA processa o contexto, não apenas palavras-chave.' },
                                    { step: '03', title: 'Ela Executa', desc: 'Ligação, mensagem, agendamento ou análise visual.' },
                                    { step: '04', title: 'Você Vive', desc: 'Receba apenas a confirmação de que está feito.' },
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-2xl font-black text-gray-200">{step.step}</span>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                            <p className="text-gray-500">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-900 rounded-[3rem] p-8 relative overflow-hidden h-[600px] flex items-center justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-30"></div>
                            
                            {/* Chat Simulation */}
                            <div className="w-full max-w-sm space-y-4 relative z-10">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tr-none self-end ml-auto max-w-[80%] border border-white/10">
                                    <p className="text-white text-sm">Sync, minha geladeira está vazia. O que eu compro?</p>
                                </div>
                                <div className="bg-blue-600 p-4 rounded-2xl rounded-tl-none self-start max-w-[80%] shadow-lg">
                                    <p className="text-white text-sm">Analisei sua última foto. Falta leite e ovos. Já adicionei na lista. Quer que eu envie para seu WhatsApp?</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl rounded-tr-none self-end ml-auto max-w-[80%] border border-white/10">
                                    <p className="text-white text-sm">Sim, por favor. Ah, e ligue para o restaurante italiano e reserve mesa para 2 às 20h.</p>
                                </div>
                                <div className="bg-blue-600 p-4 rounded-2xl rounded-tl-none self-start max-w-[80%] shadow-lg">
                                    <p className="text-white text-sm">Enviado. Ligando para 'La Pasta'... <br/><span className="text-xs opacity-70 mt-2 block">📞 Chamando...</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Escolha o plano ideal para a sua vida.</h2>
                        <p className="text-gray-500 text-lg">Tecnologia, velocidade e automação real — no seu ritmo.</p>
                    </div>

                    {/* Currency Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white border border-gray-200 rounded-full p-1 flex shadow-sm">
                            {(['EUR', 'USD', 'BRL'] as Currency[]).map((cur) => (
                                <button
                                    key={cur}
                                    onClick={() => setCurrency(cur)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                        currency === cur 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    {cur}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 1. FREE */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-blue-200 transition-all flex flex-col">
                            <div className="mb-4">
                                <h3 className="font-bold text-xl text-gray-900">Free</h3>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">Iniciante</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black text-gray-900">{currencySymbol[currency]}{pricingData[currency].free}</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> 30 mensagens IA/mês</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> 10 mins voz</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> 3 chamadas teste</li>
                                <li className="flex gap-2 text-sm text-gray-400"><CloseIcon className="w-5 h-5 flex-shrink-0" /> Sem automação real</li>
                            </ul>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-colors">Começar Grátis</button>
                        </div>

                        {/* 2. PESSOAL */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-blue-200 transition-all flex flex-col">
                            <div className="mb-4">
                                <h3 className="font-bold text-xl text-gray-900">Pessoal</h3>
                                <p className="text-xs text-blue-600 mt-1 uppercase tracking-wide font-bold">Uso Diário</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black text-gray-900">{currencySymbol[currency]}{pricingData[currency].personal}</span>
                                <span className="text-gray-400 text-sm">/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> Voz Ilimitada</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> Agenda Integrada</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" /> Lembretes Inteligentes</li>
                                <li className="flex gap-2 text-sm text-gray-400"><CloseIcon className="w-5 h-5 flex-shrink-0" /> Sem Chamadas Ilimitadas</li>
                            </ul>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-colors">Assinar Pessoal</button>
                        </div>

                        {/* 3. PREMIUM (Highlighted) */}
                        <div className="bg-gray-900 p-6 rounded-3xl shadow-xl transform lg:-translate-y-4 flex flex-col relative border border-gray-700">
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-widest">Mais Popular</div>
                            <div className="mb-4">
                                <h3 className="font-bold text-xl text-white">Premium</h3>
                                <p className="text-xs text-blue-400 mt-1 uppercase tracking-wide font-bold">Poder Total</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black text-white">{currencySymbol[currency]}{pricingData[currency].premium}</span>
                                <span className="text-gray-500 text-sm">/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-2 text-sm text-gray-300"><CheckIcon className="w-5 h-5 text-blue-400 flex-shrink-0" /> Chamadas Reais Ilimitadas</li>
                                <li className="flex gap-2 text-sm text-gray-300"><CheckIcon className="w-5 h-5 text-blue-400 flex-shrink-0" /> Rotinas Personalizadas</li>
                                <li className="flex gap-2 text-sm text-gray-300"><CheckIcon className="w-5 h-5 text-blue-400 flex-shrink-0" /> Ações Inteligentes (Twilio)</li>
                                <li className="flex gap-2 text-sm text-gray-300"><CheckIcon className="w-5 h-5 text-blue-400 flex-shrink-0" /> Memória Permanente</li>
                            </ul>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all">Assinar Premium</button>
                        </div>

                        {/* 4. FAMÍLIA */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-blue-200 transition-all flex flex-col">
                            <div className="mb-4">
                                <h3 className="font-bold text-xl text-gray-900">Família</h3>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide font-bold">Até 4 Pessoas</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-4xl font-black text-gray-900">{currencySymbol[currency]}{pricingData[currency].family}</span>
                                <span className="text-gray-400 text-sm">/mês</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> 4 Perfis Independentes</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Rotinas Compartilhadas</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Agenda da Família</li>
                                <li className="flex gap-2 text-sm text-gray-600"><CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" /> Assistente Doméstica</li>
                            </ul>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-colors">Assinar Família</button>
                        </div>
                    </div>
                </div>
            </section>

             {/* --- TESTIMONIALS --- */}
             <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Carlos M.", role: "Empresário, Brasil", quote: "A função de ligar para clientes e confirmar reuniões salvou minha agenda. Inacreditável." },
                            { name: "Sarah J.", role: "Architect, UK", quote: "The English Tutor mode is better than any app I've used. It actually corrects my accent." },
                            { name: "Pierre L.", role: "Chef, France", quote: "J'adore le module Chef. It creates amazing recipes from my leftovers. Genius." }
                        ].map((t, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                <div className="flex text-yellow-400 mb-4"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                                <p className="text-gray-600 italic mb-6">"{t.quote}"</p>
                                <div>
                                    <p className="font-bold text-gray-900">{t.name}</p>
                                    <p className="text-xs text-gray-500 uppercase">{t.role}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
             </section>

            {/* --- FAQ --- */}
            <section className="py-24 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {[
                        { q: "Quais são os preços?", a: "Temos planos a partir de Grátis até R$ 59,90 (Família). Veja a tabela acima para detalhes em sua moeda." },
                        { q: "A Sync realmente faz ligações?", a: "Sim. O plano Premium inclui créditos para chamadas telefônicas reais via rede PSTN global." },
                        { q: "Meus dados são privados?", a: "Absolutamente. Seus dados são criptografados e nunca vendidos. A Sync só 'ouve' quando você ativa o modo de voz." },
                        { q: "Como cancelar?", a: "Você pode cancelar a qualquer momento direto no painel do usuário, sem multas ou taxas." },
                        { q: "Quais limites da IA?", a: "O plano Free tem limites de mensagens. Os planos pagos possuem uso justo (fair use) muito alto, praticamente ilimitado para uso pessoal." },
                        { q: "Quais países suportados?", a: "Atualmente suportamos números de telefone na Europa, EUA, Brasil e mais 40 países." },
                        { q: "O plano família serve para amigos?", a: "Sim, você pode adicionar até 4 e-mails diferentes, independente do parentesco." },
                        { q: "Aplicações reais?", a: "Desde reservar mesas, pedir gás, agendar consultas até gerenciar a lista de compras da casa." }
                    ].map((faq, i) => (
                        <div key={i} className="border-b border-gray-200">
                            <button 
                                onClick={() => toggleFaq(i)}
                                className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
                            >
                                <span className="font-bold text-lg text-gray-900">{faq.q}</span>
                                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaq === i && (
                                <div className="pb-6 text-gray-600 leading-relaxed animate-fade-in">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA FINAL --- */}
            <section className="py-32 bg-blue-600 text-white text-center px-4">
                <h2 className="text-4xl font-black mb-6">Pronto para viver com mais tempo e menos esforço?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Junte-se a milhares de usuários que automatizaram suas vidas com a Sync Prime.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     {installPrompt ? (
                        <button 
                            onClick={onInstall}
                            className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition-transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <DownloadIcon className="w-6 h-6" /> BAIXAR APP
                        </button>
                     ) : (
                        <button 
                            onClick={onEnter}
                            className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition-transform hover:scale-105"
                        >
                            Criar Minha Conta Sync Prime
                        </button>
                     )}
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <SyncPrimeLogo className="w-6 h-6 grayscale opacity-50" />
                            <span className="font-bold text-white">Sync Prime</span>
                        </div>
                        <p className="text-sm">Intelligence, Applied.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Produto</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Recursos</a></li>
                            <li><a href="#" className="hover:text-white">Preços</a></li>
                            <li><a href="#" className="hover:text-white">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Empresa</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Sobre</a></li>
                            <li><a href="#" className="hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:text-white">Carreiras</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Privacidade</a></li>
                            <li><a href="#" className="hover:text-white">Termos</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs">
                    © 2025 Sync Prime Technologies. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
