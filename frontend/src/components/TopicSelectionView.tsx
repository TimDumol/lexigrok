import React from 'react';
import TopicSelector from './TopicSelector';
import { Topic } from './TopicCard';

interface TopicSelectionViewProps {
  suggestedTopics: Topic[];
  onSelectTopic: (topic: Topic | string) => void;
  onSelectImage: () => void; // New prop for handling image selection
}

const TopicSelectionView: React.FC<TopicSelectionViewProps> = ({
  suggestedTopics,
  onSelectTopic,
  onSelectImage,
}) => {
  return (
    <div className="container mx-auto py-8">
      <TopicSelector
        suggestedTopics={suggestedTopics}
        onSelectTopic={onSelectTopic}
        onSelectImage={onSelectImage} // Pass the handler down
      />
    </div>
  );
};

export default TopicSelectionView;
