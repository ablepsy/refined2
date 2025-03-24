"use client";

import React, { useState, FormEvent } from 'react';

interface MessageFormProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  onClearConversation: () => void;
  onExportChat: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ 
  onSendMessage, 
  isLoading, 
  onClearConversation,
  onExportChat
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === '' || isLoading) return;
    
    const messageToSend = message;
    setMessage('');
    await onSendMessage(messageToSend);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={onClearConversation}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded"
          type="button"
        >
          Clear Conversation
        </button>
        <button
          onClick={onExportChat}
          className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded"
          type="button"
        >
          Export Chat
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-end">
        <div className="flex-grow">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || message.trim() === ''}
          className={`ml-3 px-4 py-3 rounded-lg ${
            isLoading || message.trim() === ''
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
