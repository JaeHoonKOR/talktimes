'use client';

import { SessionProvider } from 'next-auth/react';
import { PersonalizationProvider } from '../contexts/PersonalizationContext';
import AnalyticsProvider from './AnalyticsProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <PersonalizationProvider>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </PersonalizationProvider>
    </SessionProvider>
  );
} 