export interface MessengerMessage {
  id: string;
  type: 'received' | 'sent';
  content: string;
  timestamp: Date;
}

export interface PhoneFrameProps {
  children: React.ReactNode;
}

export interface NewHeroSectionProps {
  id?: string;
  className?: string;
}

export interface MessengerInterfaceProps {
  onMessageSend?: (message: string) => void;
  onError?: (error: Error) => void;
} 