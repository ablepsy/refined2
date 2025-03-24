"use client";

import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">ChatGPT Clone</h1>
          <div className="text-sm text-gray-500">Personal AI Assistant</div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        {children}
      </main>
      <footer className="max-w-4xl mx-auto px-4 py-3 text-center text-sm text-gray-500">
        Built with Next.js and OpenAI
      </footer>
    </div>
  );
};

export default Layout;
