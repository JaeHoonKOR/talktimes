'use client';

import { SessionProvider } from 'next-auth/react';
import { PersonalizationProvider } from '../contexts/PersonalizationContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PersonalizationProvider>
        {children}
      </PersonalizationProvider>
    </SessionProvider>
  );
} 