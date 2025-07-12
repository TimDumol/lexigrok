import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router'; // For "Change Topic" button
import ConversationHistory from './ConversationHistory';
import UserInput from './UserInput';
import SuggestionPrompt from './SuggestionPrompt';
import ContextualTranslationPopup from './ContextualTranslationPopup';
import { Message } from './MessageBubble'; // Re-using Message interface
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface PracticeViewProps {
  currentTopicId?: string; // From route search params
  currentTopicName?: string; // From route search params
}

const PracticeView: React.FC<PracticeViewProps> = ({
  currentTopicId = 'general', // Default topic ID
  currentTopicName = 'General Practice', // Default topic name
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showSpokenText, setShowSpokenText] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState<string | null>("Puedes empezar con 'Hola'."); // Initial suggestion

  // Contextual Translation State
  const [translationPopup, setTranslationPopup] = useState<{
    isVisible: boolean;
    word: string;
    translation: string;
    explanation?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
    position?: { top: number; left: number };
  }>({ isVisible: false, word: '', translation: '' });

  // Simulate receiving initial bot message when topic changes
  useEffect(() => {
    setMessages([
      {
        id: 'bot-intro',
        sender: 'bot',
        text: `Hola! Let's practice the topic: "${currentTopicName}". How can I help you?`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    // In a real app, you might fetch a new suggestion based on the topic
    setCurrentSuggestion(`Ask something related to "${currentTopicName}". For example, "What is common in this situation?"`);
  }, [currentTopicName]);

  const handleSendMessage = (text: string, type: 'text' | 'voice') => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString(),
      // originalSpokenText: type === 'voice' ? text : undefined, // If STT provides this
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `I received your message: "${text}". This is a placeholder response.`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      // Simulate new suggestion
      setCurrentSuggestion("Now try to ask a question or make a statement.");
    }, 1000);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // Actual speech recognition logic would go here
    if (!isRecording) {
      // Simulate speech recognized after stopping recording
      // setTimeout(() => {
      //   handleSendMessage("This is a simulated spoken message.", 'voice');
      //   setIsRecording(false);
      // }, 1500);
    }
  };

  const handleNextSuggestion = () => {
    // Cycle through mock suggestions or fetch from an API
    const mockSuggestions = [
      "¿Puedes repetir eso, por favor?",
      "No entiendo. ¿Qué significa eso?",
      `Tell me more about ${currentTopicName}.`,
      "What's another way to say that?",
    ];
    setCurrentSuggestion(mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)]);
  };

  const handleUseSuggestion = (suggestionText: string) => {
    // Directly send the suggestion as a user message or fill the input
    handleSendMessage(suggestionText, 'text');
  };

  const handleWordClick = (word: string, _messageText: string, event?: React.MouseEvent) => {
    // In a real app, fetch translation from API
    // For now, mock translation
    setTranslationPopup({
      isVisible: true,
      word: word,
      translation: `Translation of "${word}" (mock)`,
      explanation: `This is a mock explanation for "${word}".`,
      exampleSentence: `Ejemplo con "${word}".`,
      exampleTranslation: `Example with "${word}".`,
      position: event ? { top: event.clientY + 5, left: event.clientX + 5 } : undefined,
    });
  };

  const handleCloseTranslationPopup = () => {
    setTranslationPopup((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,100px))]"> {/* Adjust var(--header-height) if you have a fixed header */}
      <header className="p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Change Topic
            </Link>
            <h1 className="text-xl font-semibold mt-1">
              Practice: {currentTopicName}
            </h1>
            <p className="text-xs text-muted-foreground">Topic ID: {currentTopicId}</p>
          </div>
          {/* Other controls like settings can go here */}
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
        className="flex-grow" // Takes up available space
      />

      <UserInput
        onSendMessage={handleSendMessage}
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
        showSpokenText={showSpokenText}
        onToggleShowSpokenText={() => setShowSpokenText(!showSpokenText)}
      />

      <ContextualTranslationPopup
        {...translationPopup}
        onClose={handleCloseTranslationPopup}
      />
    </div>
  );
};

export default PracticeView;
