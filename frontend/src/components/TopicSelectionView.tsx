import React from 'react';
import TopicSelector from './TopicSelector';
import { Topic } from './TopicCard'; // Import the Topic interface

interface TopicSelectionViewProps {
  suggestedTopics: Topic[];
  onSelectTopic: (topic: Topic | string) => void;
}

const TopicSelectionView: React.FC<TopicSelectionViewProps> = ({ suggestedTopics, onSelectTopic }) => {
  return (
    <div className="container mx-auto py-8">
      {/*
        The h1 title might be better placed in the route component (routes/index.tsx)
        or __root.tsx for consistency in page titles, but keeping it here for now
        as per original component structure.
      */}
      {/* <h1 className="text-3xl font-bold text-center mb-8">Select a Topic</h1> */}
      <TopicSelector
        suggestedTopics={suggestedTopics}
        onSelectTopic={onSelectTopic}
      />
    </div>
  );
};

export default TopicSelectionView;
