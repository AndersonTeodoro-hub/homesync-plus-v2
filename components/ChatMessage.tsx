import React from 'react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  onFeedback?: any;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] p-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/10'}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};