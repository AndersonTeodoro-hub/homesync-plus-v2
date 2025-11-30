import React, { useState } from 'react';
import { SyncPrimeLogo, PhoneIcon, MicIcon, CheckIcon, ArrowRightIcon, ChevronDownIcon, CloseIcon, StarIcon } from './Icons';

interface LandingPageProps {
    onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (idx: number) => {
        setOpenFaq(openFaq === idx ? null : idx);
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
                        <button 
                            onClick={onEnter}
                            className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Entrar
                        </button>
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
                        <button 
                            onClick={onEnter}
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            Começar Agora <ArrowRightIcon className="w-5 h-5" />
                        </button>
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
            <section className="py-24 bg-gray-50">
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

            {/* --- COMPARISON --- */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Mais do que uma IA. Uma assistente real.</h2>
                        <p className="text-gray-400">Por que a Sync Prime está uma geração à frente.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="py-6 px-4 text-gray-500 font-medium uppercase tracking-wider text-sm">Recurso</th>
                                    <th className="py-6 px-4 text-white font-bold text-xl">Sync Prime</th>
                                    <th className="py-6 px-4 text-gray-500 font-medium">Outros (Siri/Alexa)</th>
                                    <th className="py-6 px-4 text-gray-500 font-medium">Chatbots (GPT)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {[
                                    { feat: 'Chamadas Telefônicas Reais', sync: true, others: false, gpt: false },
                                    { feat: 'Visão Computacional Ativa', sync: true, others: false, gpt: true },
                                    { feat: 'Memória de Longo Prazo', sync: true, others: false, gpt: true },
                                    { feat: 'Proatividade (Inicia Conversa)', sync: true, others: false, gpt: false },
                                    { feat: 'Integração WhatsApp Nativa', sync: true, others: false, gpt: false },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="py-6 px-4 font-medium">{row.feat}</td>
                                        <td className="py-6 px-4 text-blue-400"><CheckIcon className="w-6 h-6" /></td>
                                        <td className="py-6 px-4 text-gray-600"><CloseIcon className="w-5 h-5" /></td>
                                        <td className="py-6 px-4 text-gray-600">{row.gpt ? <span className="text-yellow-500 text-sm">Parcial</span> : <CloseIcon className="w-5 h-5" />}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Planos simples e transparentes</h2>
                        <p className="text-gray-500 mt-2">Comece grátis. Evolua conforme precisa.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Free */}
                        <div className="p-8 rounded-3xl border border-gray-200 hover:border-blue-200 transition-all">
                            <h3 className="font-bold text-xl text-gray-900">Starter</h3>
                            <div className="my-4"><span className="text-4xl font-bold">€0</span><span className="text-gray-500">/mês</span></div>
                            <p className="text-sm text-gray-500 mb-6">Para conhecer a inteligência.</p>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50">Começar Grátis</button>
                            <ul className="mt-8 space-y-3 text-sm text-gray-600">
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-green-500" /> Chat Ilimitado</li>
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-green-500" /> Módulos Básicos</li>
                                <li className="flex gap-2"><CloseIcon className="w-5 h-5 text-gray-300" /> Sem Chamadas</li>
                            </ul>
                        </div>

                        {/* Pro */}
                        <div className="p-8 rounded-3xl bg-gray-900 text-white shadow-xl transform scale-105 relative">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>
                            <h3 className="font-bold text-xl">Personal</h3>
                            <div className="my-4"><span className="text-4xl font-bold">€19</span><span className="text-gray-400">/mês</span></div>
                            <p className="text-sm text-gray-400 mb-6">Automação total para você.</p>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl bg-blue-600 font-bold hover:bg-blue-500">Assinar Agora</button>
                            <ul className="mt-8 space-y-3 text-sm text-gray-300">
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-blue-400" /> Tudo do Free</li>
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-blue-400" /> 50 Chamadas/mês</li>
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-blue-400" /> Módulos Avançados (CFO, Chef)</li>
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-blue-400" /> Voz Ultra Realista</li>
                            </ul>
                        </div>

                        {/* Family */}
                        <div className="p-8 rounded-3xl border border-gray-200 hover:border-blue-200 transition-all">
                            <h3 className="font-bold text-xl text-gray-900">Family</h3>
                            <div className="my-4"><span className="text-4xl font-bold">€49</span><span className="text-gray-500">/mês</span></div>
                            <p className="text-sm text-gray-500 mb-6">Proteção e gestão para a casa.</p>
                            <button onClick={onEnter} className="w-full py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50">Assinar Família</button>
                            <ul className="mt-8 space-y-3 text-sm text-gray-600">
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-green-500" /> Até 5 Usuários</li>
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-green-500" /> Chamadas Ilimitadas</li>
                                <li className="flex gap-2"><CheckIcon className="w-5 h-5 text-green-500" /> Modo Babá Premium</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

             {/* --- TESTIMONIALS --- */}
             <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Carlos M.", role: "Empresário, Brasil", quote: "A função de ligar para clientes e confirmar reuniões salvou minha agenda. Inacreditável." },
                            { name: "Sarah J.", role: "Architect, UK", quote: "The English Tutor mode is better than any app I've used. It actually corrects my accent." },
                            { name: "Pierre L.", role: "Chef, France", quote: "J'adore le module Chef. It creates amazing recipes from my leftovers. Genius." }
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
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
                        { q: "A Sync realmente faz ligações telefônicas?", a: "Sim. Utilizamos uma integração com redes de telefonia global para realizar chamadas reais para números fixos e celulares em mais de 40 países." },
                        { q: "Meus dados são privados?", a: "Absolutamente. Seus dados são criptografados e nunca vendidos. A Sync só 'ouve' quando você ativa o modo de voz." },
                        { q: "Funciona em quais idiomas?", a: "Atualmente suportamos Português, Inglês e Espanhol com fluência nativa." },
                        { q: "Preciso pagar para usar?", a: "Temos um plano gratuito robusto. As chamadas telefônicas e recursos avançados de visão requerem o plano Pro." }
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
                <h2 className="text-4xl font-black mb-6">Pronto para viver no futuro?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Junte-se a milhares de usuários que automatizaram suas vidas com a Sync Prime.</p>
                <button 
                    onClick={onEnter}
                    className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition-transform hover:scale-105"
                >
                    Criar Minha Conta
                </button>
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