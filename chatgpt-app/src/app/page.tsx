"use client";

import { NextPage } from 'next';
import Layout from '../components/Layout';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import { useMessages } from '../utils/useMessages';

const Home: NextPage = () => {
  const { messages, addMessage, isLoadingAnswer, clearConversation, exportChat } = useMessages();

  return (
    <Layout>
      <div className="flex flex-col h-[80vh]">
        <div className="flex-grow overflow-hidden">
          <MessageList 
            messages={messages || []} 
            isLoading={isLoadingAnswer || false} 
          />
        </div>
        <div>
          <MessageForm 
            onSendMessage={addMessage || (async () => {})} 
            isLoading={isLoadingAnswer || false}
            onClearConversation={clearConversation || (() => {})}
            onExportChat={exportChat || (() => {})}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
