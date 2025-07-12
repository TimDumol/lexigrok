import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble'; // Import Message interface from MessageBubble
import type { Message } from './MessageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ConversationHistoryProps {
  messages: Message[];
  onWordClick: (word: string, messageText: string) => void;
  showUserSpokenTextSetting?: boolean; // Global setting from PracticeView
  className?: string;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  messages,
  onWordClick,
  // showUserSpokenTextSetting,
  className,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);


  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea
      className={cn("h-[400px] w-full p-4 border rounded-md bg-muted/20", className)}
      ref={scrollAreaRef} // Not directly used for scrolling viewport, but good for reference
    >
      <div ref={viewportRef} className="h-full w-full"> {/* This is the viewport for ScrollArea */}
        <div className="flex flex-col space-y-2">
          {messages.length === 0 ? (
            <p className="text-center text-muted-foreground">Conversation will appear here...</p>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onWordClick={onWordClick}
              // Assuming originalUserSpokenText is part of the Message object if applicable
              // showUserSpokenText={msg.sender === 'user' ? showUserSpokenTextSetting : undefined}
              // originalUserSpokenText={msg.sender === 'user' ? msg.originalSpokenText : undefined}
              />
            ))
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ConversationHistory;
