import React, { useState } from 'react';
import TopicCard, { Topic } from './TopicCard'; // Import TopicCard and its Topic interface
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TopicSelectorProps {
  suggestedTopics: Topic[];
  onSelectTopic: (topic: Topic | string) => void; // Can be a predefined topic object or a custom string
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ suggestedTopics, onSelectTopic }) => {
  const [customTopic, setCustomTopic] = useState('');

  const handleStartCustomTopic = () => {
    if (customTopic.trim()) {
      onSelectTopic(customTopic.trim());
      setCustomTopic(''); // Clear input after submission
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Choose a Topic</h2>
        <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
          <Input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Or enter a custom topic..."
            aria-label="Custom topic input"
          />
          <Button onClick={handleStartCustomTopic} disabled={!customTopic.trim()}>
            Start Custom Topic
          </Button>
        </div>
      </div>

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
