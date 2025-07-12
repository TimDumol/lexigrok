import { createFileRoute, useNavigate } from '@tanstack/react-router';
import TopicSelectionView from '@/components/TopicSelectionView';
import { Topic } from '@/components/TopicCard'; // Import Topic interface
import React from 'react';

// Placeholder topics - this would come from an API or state management in a real app
const mockTopics: Topic[] = [
  { id: 'food', name: 'Ordering food', description: 'Practice common phrases for dining out in Spanish.' },
  { id: 'pharmacy', name: 'At the pharmacy', description: 'Learn to discuss symptoms and ask for medicine.' },
  { id: 'directions', name: 'Asking for directions', description: 'Master how to ask for and understand directions.' },
  { id: 'travel', name: 'Planning a trip', description: 'Talk about booking flights, hotels, and itineraries.' },
  { id: 'hobbies', name: 'Talking about hobbies', description: 'Share your interests and learn related vocabulary.' },
];

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const navigate = useNavigate({ from: Route.fullPath });

  const handleTopicSelect = (selectedTopic: Topic | string) => {
    let topicId: string;
    let topicName: string;

    if (typeof selectedTopic === 'string') {
      // For custom topics, generate an ID (can be simple for now)
      topicId = selectedTopic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      topicName = selectedTopic;
    } else {
      topicId = selectedTopic.id;
      topicName = selectedTopic.name;
    }

    // Navigate to the practice route with the topic information as search params
    navigate({
      to: '/practice',
      search: { topicId, topicName }, // These will be validated by the /practice route
    });
  };

  return (
    <TopicSelectionView
      suggestedTopics={mockTopics}
      onSelectTopic={handleTopicSelect}
    />
  );
}
