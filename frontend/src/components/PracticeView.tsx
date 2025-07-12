import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import ConversationHistory from './ConversationHistory';
import UserInput from './UserInput';
import SuggestionPrompt from './SuggestionPrompt';
import ContextualTranslationPopup from './ContextualTranslationPopup';
import { Message } from './MessageBubble';
import { ChevronLeft } from 'lucide-react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"


interface PracticeViewProps {
  currentTopicId?: string;
  currentTopicName?: string;
  imageUrl?: string; // New prop for the image URL
}

const PracticeView: React.FC<PracticeViewProps> = ({
  currentTopicId = 'general',
  currentTopicName = 'General Practice',
  imageUrl,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showSpokenText, setShowSpokenText] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState<string | null>(null);

  const [translationPopup, setTranslationPopup] = useState<{
    isVisible: boolean;
    word: string;
    translation: string;
    explanation?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
    position?: { top: number; left: number };
  }>({ isVisible: false, word: '', translation: '' });

  useEffect(() => {
    const isImagePractice = currentTopicId === 'image-practice' && imageUrl;
    const introText = isImagePractice
      ? "¡Qué buena foto! ¿Qué ves en la imagen?"
      : `Hola! Let's practice the topic: "${currentTopicName}". How can I help you?`;
    const suggestionText = isImagePractice
      ? "Describe the main subject of the image."
      : `Ask something related to "${currentTopicName}".`;

    setMessages([{
      id: 'bot-intro',
      sender: 'bot',
      text: introText,
      timestamp: new Date().toLocaleTimeString(),
    }]);
    setCurrentSuggestion(suggestionText);
  }, [currentTopicId, currentTopicName, imageUrl]);

  const handleSendMessage = (text: string, _type: 'text' | 'voice' = 'text') => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `I received: "${text}". (Placeholder response)`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setCurrentSuggestion("Now, describe another part of the image or ask a question.");
    }, 1000);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // Speech recognition logic would be here
  };

  const handleNextSuggestion = () => {
    const mockSuggestions = [
      "¿Puedes repetir eso, por favor?",
      "No entiendo. ¿Qué significa eso?",
      `Tell me more about the background.`,
      "What's another way to say that?",
    ];
    setCurrentSuggestion(mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)]);
  };

  const handleUseSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleWordClick = (word: string, _message: string, event?: React.MouseEvent) => {
    setTranslationPopup({
      isVisible: true,
      word: word,
      translation: `Translation of "${word}"`,
      position: event ? { top: event.clientY + 5, left: event.clientX + 5 } : undefined,
    });
  };

  const handleCloseTranslationPopup = () => {
    setTranslationPopup({ ...translationPopup, isVisible: false });
  };

  const isImagePractice = currentTopicId === 'image-practice' && imageUrl;

  const ChatInterface = () => (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Change Topic
            </Link>
            <h1 className="text-xl font-semibold mt-1">
              {currentTopicName}
            </h1>
          </div>
        </div>
      </header>
      <SuggestionPrompt
        suggestion={currentSuggestion}
        onNextSuggestion={handleNextSuggestion}
        onUseSuggestion={handleUseSuggestion}
      />
      <ConversationHistory
        messages={messages}
        onWordClick={(word, text, e) => handleWordClick(word, text, e as React.MouseEvent)}
        showUserSpokenTextSetting={showSpokenText}
        className="flex-grow"
      />
      <UserInput
        onSendMessage={handleSendMessage}
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
        showSpokenText={showSpokenText}
        onToggleShowSpokenText={() => setShowSpokenText(!showSpokenText)}
      />
    </div>
  );

  return (
    <>
      {isImagePractice ? (
        <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100vh-var(--header-height,60px))]">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <img src={imageUrl} alt="Practice context" className="max-h-full max-w-full object-contain rounded-lg" />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <ChatInterface />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="h-full max-h-[calc(100vh-var(--header-height,60px))]">
          <ChatInterface />
        </div>
      )}
      <ContextualTranslationPopup
        {...translationPopup}
        onClose={handleCloseTranslationPopup}
      />
    </>
  );
};

export default PracticeView;
