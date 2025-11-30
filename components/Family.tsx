
import React, { useState, useEffect } from 'react';
import { ModuleHeader } from './ModuleHeader';
import { FamilyIcon, PhoneIcon, WhatsAppIcon, PlusIcon, TrashIcon, PencilIcon } from './Icons';
import type { Contact } from '../types';

export const Family: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('familyContacts');
        if (saved) {
            setContacts(JSON.parse(saved));
        } else {
             // Init with default for demo if empty
             const defaultContacts: Contact[] = [
                { id: 1, name: 'Cris', relationship: 'Esposa', phone: '5511999999999', whatsapp: '5511999999999', email: '' }
             ];
             setContacts(defaultContacts);
             localStorage.setItem('familyContacts', JSON.stringify(defaultContacts));
        }
    }, []);

    const saveContacts = (newContacts: Contact[]) => {
        setContacts(newContacts);
        localStorage.setItem('familyContacts', JSON.stringify(newContacts));
    };

    const handleOpenModal = (contact?: Contact) => {
        if (contact) {
            setEditingContact(contact);
            setName(contact.name);
            setRelationship(contact.relationship);
            setPhone(contact.phone);
            setWhatsapp(contact.whatsapp);
        } else {
            setEditingContact(null);
            setName('');
            setRelationship('');
            setPhone('');
            setWhatsapp('');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple Validation: Ensure phone has basic length
        if (phone.length < 8) {
            alert("Por favor, insira um telefone válido com DDD.");
            return;
        }

        if (editingContact) {
            // Update
            const updated = contacts.map(c => c.id === editingContact.id ? { ...c, name, relationship, phone, whatsapp } : c);
            saveContacts(updated);
        } else {
            // Create
            const newContact: Contact = {
                id: Date.now(),
                name,
                relationship,
                phone,
                whatsapp: whatsapp || phone, // Default to phone if empty
                email: ''
            };
            saveContacts([...contacts, newContact]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este contato?')) {
            const updated = contacts.filter(c => c.id !== id);
            saveContacts(updated);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-indigo-900 text-white relative">
            <ModuleHeader 
                title="Família & Contatos" 
                icon={<FamilyIcon />} 
                voiceState="idle" 
                gradientFrom="from-blue-500" 
                gradientTo="to-indigo-500" 
                onAvatarClick={() => {}} // No specific voice session needed for CRUD
            />

            <main className="flex-1 overflow-y-auto p-6 pb-24">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-blue-200">Agenda Inteligente</h2>
                        <p className="text-xs text-gray-400">A Sync usará estes contatos para ligações e mensagens.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105"
                    >
                        <PlusIcon />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contacts.length === 0 ? (
                        <div className="col-span-full text-center py-10 opacity-50">
                            <p>Nenhum contato adicionado.</p>
                            <p className="text-sm">Clique no botão + para adicionar.</p>
                        </div>
                    ) : (
                        contacts.map(contact => (
                            <div key={contact.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-lg font-bold shadow-md">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{contact.name}</h3>
                                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-blue-200">{contact.relationship}</span>
                                        <div className="flex gap-2 mt-2">
                                            {contact.phone && <div className="flex items-center gap-1 text-xs text-gray-400"><PhoneIcon className="w-3 h-3" /> {contact.phone}</div>}
                                            {contact.whatsapp && <div className="flex items-center gap-1 text-xs text-green-400"><WhatsAppIcon className="w-3 h-3" /> WhatsApp</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenModal(contact)} className="p-2 bg-white/10 rounded-lg hover:bg-blue-500/50"><PencilIcon className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(contact.id)} className="p-2 bg-white/10 rounded-lg hover:bg-red-500/50"><TrashIcon className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-slate-800 border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-6">{editingContact ? 'Editar Contato' : 'Novo Contato'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome (Como você chama)</label>
                                <input 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                                    placeholder="Ex: Cris, Amor, Mãe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Parentesco (Opcional)</label>
                                <input 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                                    placeholder="Ex: Esposa, Filho, Amigo"
                                    value={relationship}
                                    onChange={e => setRelationship(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Telefone (com DDD)</label>
                                <input 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                                    placeholder="Ex: 11999999999"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                                    type="tel"
                                    required
                                />
                                <p className="text-[10px] text-gray-500 mt-1">Apenas números. O sistema adicionará +55 automaticamente se necessário.</p>
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">WhatsApp (Opcional)</label>
                                <input 
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none" 
                                    placeholder="Mesmo do telefone se vazio"
                                    value={whatsapp}
                                    onChange={e => setWhatsapp(e.target.value.replace(/[^0-9]/g, ''))}
                                    type="tel"
                                />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold text-gray-400 hover:bg-white/10">Cancelar</button>
                                <button type="submit" className="flex-1 py-3 bg-blue-600 rounded-xl font-bold text-white hover:bg-blue-500">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
