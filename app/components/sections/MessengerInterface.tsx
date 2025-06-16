"use client";

import { logger } from '@/utils/logger';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { INITIAL_MESSAGES } from './constants';
import { MessengerInterfaceProps, MessengerMessage } from './types';

export const MessengerInterface: React.FC<MessengerInterfaceProps> = ({ onMessageSend, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessengerMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    try {
      if (containerRef.current) {
        gsap.fromTo(
          '.message-bubble',
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.15, 
            duration: 0.5,
            ease: 'power2.out' 
          }
        );
      }
    } catch (error) {
      logger.error('메시지 애니메이션 초기화 중 오류 발생:', error);
      onError?.(error as Error);
    }
  }, [onError]);

  const handleSendMessage = () => {
    try {
      if (!inputValue.trim()) return;

      const newMessage: MessengerMessage = {
        id: String(Date.now()),
        type: 'sent',
        content: inputValue,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      onMessageSend?.(inputValue);

      logger.info('메시지 전송 완료:', newMessage);
    } catch (error) {
      logger.error('메시지 전송 중 오류 발생:', error);
      onError?.(error as Error);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-64 h-[480px] bg-gray-100 rounded-3xl shadow-xl overflow-hidden relative mx-auto"
    >
      <div className="h-14 bg-white shadow-sm flex items-center px-4">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-3"></div>
        <div>
          <div className="font-medium">Talk Times</div>
          <div className="text-xs text-gray-500">온라인</div>
        </div>
      </div>
      
      <div className="p-4 h-[calc(100%-120px)] overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message-bubble flex ${message.type === 'sent' ? 'justify-end' : ''} mb-4`}
          >
            <div 
              className={`${
                message.type === 'sent' 
                  ? 'bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-white rounded-tl-none'
              } rounded-2xl p-3 max-w-[80%] shadow-sm`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 p-2 flex items-center">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-gray-100 rounded-full px-4 h-10 focus:outline-none"
          placeholder="메시지 입력..."
        />
        <button
          onClick={handleSendMessage}
          className="w-10 h-10 bg-blue-500 rounded-full ml-2 flex items-center justify-center text-white cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full"></div>
    </div>
  );
}; 