import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from './ui/button';
import { Volume2, X } from 'lucide-react';

interface TranslationSidebarProps {
  selectedText: string;
  translation: string;
  explanation?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  audioPronunciationUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

const TranslationSidebar: React.FC<TranslationSidebarProps> = ({
  selectedText,
  translation,
  explanation,
  exampleSentence,
  exampleTranslation,
  audioPronunciationUrl,
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  const handlePlayAudio = () => {
    if (audioPronunciationUrl) {
      const audio = new Audio(audioPronunciationUrl);
      audio.play().catch(err => console.error("Failed to play audio:", err));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-2xl">"{selectedText}"</SheetTitle>
          <SheetDescription>
            Contextual Translation & Details
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-3">
          <div>
            <h4 className="font-semibold text-lg">{translation}</h4>
            {audioPronunciationUrl && (
              <Button variant="ghost" size="icon" onClick={handlePlayAudio} title="Play pronunciation">
                <Volume2 className="h-5 w-5" />
              </Button>
            )}
          </div>
          {explanation && (
            <div>
              <p className="text-sm text-muted-foreground">{explanation}</p>
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
        <SheetClose asChild>
          <Button type="button" variant="outline" onClick={onClose} className="absolute top-4 right-4">
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default TranslationSidebar;
