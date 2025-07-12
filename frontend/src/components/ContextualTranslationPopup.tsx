import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  // DialogFooter, // If needed for actions like "Add to vocabulary"
  // DialogClose, // For a dedicated close button in footer
} from "@/components/ui/dialog"; // Assuming shadcn UI path
import { Button } from './ui/button'; // For potential actions or custom close
import { Volume2 } from 'lucide-react'; // Icon for play audio

interface ContextualTranslationPopupProps {
  word: string;
  translation: string;
  explanation?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  audioPronunciationUrl?: string; // URL to audio file of the word
  isVisible: boolean;
  onClose: () => void;
  // Position is usually handled by Dialog/Popover component itself,
  // but can be kept if we need very custom placement logic not supported by default.
  // For Shadcn Dialog, it's typically centered. Popover can be anchored.
  // position?: { top: number; left: number };
}

const ContextualTranslationPopup: React.FC<ContextualTranslationPopupProps> = ({
  word,
  translation,
  explanation,
  exampleSentence,
  exampleTranslation,
  audioPronunciationUrl,
  isVisible,
  onClose,
}) => {
  if (!isVisible) {
    return null;
  }

  const handlePlayAudio = () => {
    if (audioPronunciationUrl) {
      const audio = new Audio(audioPronunciationUrl);
      audio.play().catch(err => console.error("Failed to play audio:", err));
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">"{word}"</DialogTitle>
          <DialogDescription>
            Contextual Translation & Details
          </DialogDescription>
        </DialogHeader>
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
        {/* <DialogFooter> */}
          {/* Example: <Button type="button" onClick={onClose}>Close</Button> */}
          {/* Or: <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ContextualTranslationPopup;
