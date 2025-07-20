import React from 'react';
import { Button } from './ui/button';
import { Volume2 } from 'lucide-react';

interface TranslationSidebarProps {
  selectedText: string;
  translation: string;
  explanation?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  audioPronunciationUrl?: string;
}

const TranslationSidebar: React.FC<TranslationSidebarProps> = ({
  selectedText,
  translation,
  explanation,
  exampleSentence,
  exampleTranslation,
  audioPronunciationUrl,
}) => {

  const handlePlayAudio = () => {
    if (audioPronunciationUrl) {
      const audio = new Audio(audioPronunciationUrl);
      audio.play().catch(err => console.error("Failed to play audio:", err));
    }
  };

  if (!selectedText) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">Click a word to see its translation.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold">"{selectedText}"</h3>
      <p className="text-lg text-muted-foreground">{translation}</p>
      {audioPronunciationUrl && (
        <Button variant="ghost" size="icon" onClick={handlePlayAudio} title="Play pronunciation">
          <Volume2 className="h-5 w-5" />
        </Button>
      )}
      {explanation && (
        <div className="mt-4">
          <p className="text-sm">{explanation}</p>
        </div>
      )}
      {exampleSentence && (
        <div className="mt-2 p-3 bg-muted/50 rounded-md">
          <p className="text-sm italic">"{exampleSentence}"</p>
          {exampleTranslation && (
            <p className="text-sm italic text-muted-foreground mt-1">
              &mdash; {exampleTranslation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslationSidebar;
