"use client";

import { ChatCompletionRequestMessage } from 'openai';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { sendMessage } from './sendMessage';

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
  clearConversation: () => void;
  exportChat: () => void;
}

const ChatsContext = createContext<Partial<ContextProps>>({});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: ChatCompletionRequestMessage = {
        role: 'system',
        content: 'You are ChatGPT, a large language model trained by OpenAI.'
      };
      const welcomeMessage: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: 'Hi, how can I help you today?'
      };
      setMessages([systemMessage, welcomeMessage]);
    };

    // When no messages are present, initialize the chat with system message and welcome message
    if (!messages?.length) {
      initializeChat();
    }
  }, [messages?.length]);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content
      };
      const newMessages = [...messages, newMessage];
      
      // Add the user message to the state so we can see it immediately
      setMessages(newMessages);
      
      // Call API to get response using the sendMessage utility
      const { message } = await sendMessage(newMessages);
      
      // Add the assistant message to the state
      setMessages([...newMessages, message]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error in chat
      const errorMessage: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.'
      };
      setMessages([...messages, errorMessage]);
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  const clearConversation = () => {
    const systemMessage: ChatCompletionRequestMessage = {
      role: 'system',
      content: 'You are ChatGPT, a large language model trained by OpenAI.'
    };
    const welcomeMessage: ChatCompletionRequestMessage = {
      role: 'assistant',
      content: 'Hi, how can I help you today?'
    };
    setMessages([systemMessage, welcomeMessage]);
  };

  const exportChat = () => {
    // Filter out system messages
    const chatToExport = messages.filter(message => message.role !== 'system');
    
    // Format the chat as text
    const chatText = chatToExport.map(message => 
      `${message.role === 'user' ? 'You' : 'AI'}: ${message.content}`
    ).join('\n\n');
    
    // Create a blob and download it
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ChatsContext.Provider value={{ 
      messages, 
      addMessage, 
      isLoadingAnswer,
      clearConversation,
      exportChat
    }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
