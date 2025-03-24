"use client";

import { MessagesProvider } from '../utils/useMessages';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MessagesProvider>
          {children}
        </MessagesProvider>
      </body>
    </html>
  );
}
