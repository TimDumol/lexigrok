import React, { useState } from 'react';
import TopicCard, { Topic } from './TopicCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileImage } from 'lucide-react';
import SuggestionView from './SuggestionView';
import { useSuggestTopics } from '@/lib/hooks';

interface TopicSelectorProps {
  suggestedTopics: Topic[];
  onSelectTopic: (topic: Topic | string) => void;
  onSelectImage: () => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  suggestedTopics,
  onSelectTopic,
  onSelectImage,
}) => {
  const [customTopic, setCustomTopic] = useState('');
  const [isSuggestionViewOpen, setSuggestionViewOpen] = useState(false);
  const { suggestions, fetchSuggestions } = useSuggestTopics();

  const handleStartCustomTopic = () => {
    if (customTopic.trim()) {
      onSelectTopic(customTopic.trim());
      setCustomTopic('');
    }
  };

  const handleSuggestTopics = async () => {
    if (customTopic.trim()) {
      await fetchSuggestions(customTopic.trim());
      setSuggestionViewOpen(true);
    }
  };

  const handleSelectSuggestion = (suggestion: Topic) => {
    onSelectTopic(suggestion);
    setSuggestionViewOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          What do you want to practice?
        </h2>
        <div className="flex flex-col sm:flex-row w-full max-w-lg mx-auto items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
          <Input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Enter a custom topic..."
            aria-label="Custom topic input"
            className="flex-grow"
          />
          <Button
            onClick={handleStartCustomTopic}
            disabled={!customTopic.trim()}
            className="w-full sm:w-auto"
          >
            Start Custom Topic
          </Button>
          <Button
            onClick={handleSuggestTopics}
            disabled={!customTopic.trim()}
            className="w-full sm:w-auto"
          >
            Suggest
          </Button>
        </div>
        <div className="text-center text-muted-foreground my-4">OR</div>
        <div className="flex justify-center">
          <Button
            onClick={onSelectImage}
            variant="outline"
            className="w-full max-w-xs"
          >
            <FileImage className="mr-2 h-4 w-4" />
            Practice with an Image
          </Button>
        </div>
      </div>

      <SuggestionView
        isOpen={isSuggestionViewOpen}
        onClose={() => setSuggestionViewOpen(false)}
        suggestions={suggestions}
        onSelectSuggestion={handleSelectSuggestion}
      />

      <div>
        <h3 className="text-xl font-semibold mb-4">Suggested Topics</h3>
        {suggestedTopics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onSelect={() => onSelectTopic(topic)}
              />
            ))}
          </div>
        ) : (
          <p>No suggested topics available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default TopicSelector;
