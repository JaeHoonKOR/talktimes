'use client';

import { SessionProvider } from 'next-auth/react';
import { PersonalizationProvider } from '../contexts/PersonalizationContext';
import AnalyticsProvider from './AnalyticsProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="talktimes-theme">
      <SessionProvider>
        <PersonalizationProvider>
          <AnalyticsProvider>
            {children}
          </AnalyticsProvider>
        </PersonalizationProvider>
      </SessionProvider>
    </ThemeProvider>
  );
} 