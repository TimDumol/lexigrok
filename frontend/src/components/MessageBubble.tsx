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

import { useState } from 'react';

interface Word {
  text: string;
  index: number;
  selected: boolean;
}

interface MessageBubbleProps {
  message: Message;
  onTextSelection: (text: string) => void;
  showUserSpokenText?: boolean; // To show user's original spoken text if applicable
  originalUserSpokenText?: string; // The text if user spoke
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onTextSelection,
  showUserSpokenText,
  originalUserSpokenText,
}) => {
  const { text, sender } = message;
  const [words, setWords] = useState<Word[]>(() =>
    text.split(/(\s+)/).map((word, index) => ({
      text: word,
      index,
      selected: false,
    }))
  );
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const handleWordClick = (word: Word) => {
    if (/\s+/.test(word.text)) return; // Ignore whitespace

    let newWords;
    if (lastClickedIndex === word.index - 2) {
      newWords = words.map((w) =>
        w.index === word.index ? { ...w, selected: true } : w
      );
    } else {
      newWords = words.map((w) => ({
        ...w,
        selected: w.index === word.index,
      }));
    }

    setWords(newWords);
    setLastClickedIndex(word.index);

    const selectedText = newWords
      .filter((w) => w.selected)
      .map((w) => w.text)
      .join('');
    onTextSelection(selectedText);
  };

  return (
    <div
      className={cn(
        "max-w-[70%] p-3 rounded-lg shadow-sm mb-3 break-words",
        sender === 'user' ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-800 self-start mr-auto"
      )}
    >
      <div className="text-sm">
        {words.map((word) => (
          <span
            key={word.index}
            className={cn(
              "cursor-pointer",
              word.selected ? "bg-blue-300" : ""
            )}
            onClick={() => handleWordClick(word)}
          >
            {word.text}
          </span>
        ))}
      </div>
      {sender === 'user' && showUserSpokenText && originalUserSpokenText && (
        <div className="text-xs text-blue-200 mt-1 italic">
          (You said: {originalUserSpokenText})
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
