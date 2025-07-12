import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Mic, MicOff, Send, Eye, EyeOff } from 'lucide-react'; // Icons

interface UserInputProps {
  onSendMessage: (message: string, type: 'text' | 'voice') => void; // Assuming voice means processed text from voice
  isRecording: boolean;
  onToggleRecording: () => void;
  showSpokenText: boolean;
  onToggleShowSpokenText: () => void;
}

const UserInput: React.FC<UserInputProps> = ({
  onSendMessage,
  isRecording,
  onToggleRecording,
  showSpokenText,
  onToggleShowSpokenText,
}) => {
  const [textMessage, setTextMessage] = useState('');

  const handleSendText = () => {
    if (textMessage.trim()) {
      onSendMessage(textMessage, 'text');
      setTextMessage('');
    }
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline on Enter
      handleSendText();
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="flex items-center space-x-2 mb-3">
        <Button onClick={onToggleRecording} variant="outline" size="icon" aria-label={isRecording ? "Stop recording" : "Start recording"}>
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-spoken-text"
            checked={showSpokenText}
            onCheckedChange={onToggleShowSpokenText}
            aria-label="Toggle visibility of your spoken text"
          />
          <Label htmlFor="show-spoken-text" className="flex items-center text-sm">
            {showSpokenText ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
            Show My Spoken Text
          </Label>
        </div>
      </div>
      <div className="flex items-end space-x-2">
        <Textarea
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          placeholder={isRecording ? "Listening... speak now!" : "Type your message or use the microphone..."}
          disabled={isRecording}
          className="flex-grow resize-none"
          rows={2}
          aria-label="Message input"
        />
        <Button onClick={handleSendText} disabled={isRecording || !textMessage.trim()} size="icon" aria-label="Send message">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default UserInput;
