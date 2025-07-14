import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Topic } from './TopicCard';

interface SuggestionViewProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: Topic[];
  onSelectSuggestion: (suggestion: Topic) => void;
}

const SuggestionView: React.FC<SuggestionViewProps> = ({ isOpen, onClose, suggestions, onSelectSuggestion }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suggested Topics</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <Button key={suggestion.id} variant="outline" onClick={() => onSelectSuggestion(suggestion)}>
                  {suggestion.title}
                </Button>
              ))}
            </div>
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionView;
