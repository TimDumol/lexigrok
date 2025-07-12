import React from 'react';
import { cn } from "@/lib/utils"; // For combining class names, common in shadcn projects

export interface Message { // Exporting Message to be used elsewhere
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string; // Optional timestamp
  // For contextual translation, we might need to pass the full message context
  // or handle word segmentation and click events more robustly.
  // For now, onWordClick will receive the clicked word and the full text of this bubble.
}

interface MessageBubbleProps {
  message: Message;
  onWordClick: (word: string, messageText: string) => void;
  showUserSpokenText?: boolean; // To show user's original spoken text if applicable
  originalUserSpokenText?: string; // The text if user spoke
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onWordClick,
  showUserSpokenText,
  originalUserSpokenText,
}) => {
  const { text, sender } = message;

  const handleWordClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const clickedWord = event.currentTarget.innerText.trim().replace(/[.,!?;:]$/, ''); // Basic cleaning
    if (clickedWord) {
      onWordClick(clickedWord, text);
    }
  };

  // Render text with each word wrapped in a span for clickability
  const renderClickableText = (inputText: string) => {
    // Improved word splitting, handles punctuation better for display but still basic for extraction
    return inputText.split(/(\s+|[.,!?;:]\s*)/).filter(part => part.length > 0).map((part, index) => {
      // Check if the part is primarily a word character or if it's just punctuation/space
      const isWord = /[a-zA-Z0-9\u00C0-\u024F]+/.test(part); // Basic check for word characters (incl. some Latin accents)
      if (isWord) {
        return (
          <span key={index} onClick={handleWordClick} className="cursor-pointer hover:bg-yellow-200 rounded px-0.5 py-0.5">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>; // Preserve spaces and punctuation as non-clickable
    });
  };

  return (
    <div
      className={cn(
        "max-w-[70%] p-3 rounded-lg shadow-sm mb-3 break-words",
        sender === 'user' ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-800 self-start mr-auto"
      )}
    >
      <div className="text-sm">{renderClickableText(text)}</div>
      {sender === 'user' && showUserSpokenText && originalUserSpokenText && (
        <div className="text-xs text-blue-200 mt-1 italic">
          (You said: {renderClickableText(originalUserSpokenText)})
        </div>
      )}
      {message.timestamp && (
        <div
          className={cn(
            "text-xs mt-1",
            sender === 'user' ? "text-blue-200 text-right" : "text-gray-500 text-left"
          )}
        >
          {message.timestamp}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
