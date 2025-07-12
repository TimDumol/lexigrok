import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react'; // Icon

interface SuggestionPromptProps {
  suggestion: string | null; // Suggestion can be null if not available
  onNextSuggestion: () => void;
  onUseSuggestion: (suggestionText: string) => void; // Callback to use the suggestion
}

const SuggestionPrompt: React.FC<SuggestionPromptProps> = ({ suggestion, onNextSuggestion, onUseSuggestion }) => {
  if (!suggestion) {
    return null; // Don't render anything if there's no suggestion
  }

  return (
    <div className="p-3 my-4 border rounded-md bg-muted/50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          <p className="text-sm italic text-muted-foreground">
            Suggestion: "{suggestion}"
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => onUseSuggestion(suggestion)}>
            Use this
          </Button>
          <Button variant="outline" size="sm" onClick={onNextSuggestion}>
            Next Suggestion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionPrompt;
