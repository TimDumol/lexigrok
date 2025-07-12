import { createFileRoute, useNavigate } from '@tanstack/react-router';
import TopicSelectionView from '@/components/TopicSelectionView';
import ImageUploadView from '@/components/ImageUploadView'; // Import the new component
import { Topic } from '@/components/TopicCard';
import React, { useState } from 'react'; // Import useState

// Mock topics remain the same
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
  const [isUploading, setIsUploading] = useState(false); // State to control view

  const handleTopicSelect = (selectedTopic: Topic | string) => {
    let topicId: string;
    let topicName: string;

    if (typeof selectedTopic === 'string') {
      topicId = selectedTopic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      topicName = selectedTopic;
    } else {
      topicId = selectedTopic.id;
      topicName = selectedTopic.name;
    }

    navigate({
      to: '/practice',
      search: { topicId, topicName },
    });
  };

  const handleImageSelect = () => {
    setIsUploading(true); // Switch to image upload view
  };

  const handleImageUploaded = (imageDataUrl: string) => {
    // Navigate to practice view with image data
    navigate({
      to: '/practice',
      search: {
        topicId: 'image-practice',
        topicName: 'Practice with Image',
        // Pass the image data URL as a search parameter
        // Note: This can be very long. For production, consider storing the image
        // on the server and passing a URL, but for this feature, this is fine.
        imageUrl: imageDataUrl,
      },
    });
  };

  const handleCancelUpload = () => {
    setIsUploading(false); // Go back to topic selection
  };

  if (isUploading) {
    return (
      <ImageUploadView
        onImageSelected={handleImageUploaded}
        onCancel={handleCancelUpload}
      />
    );
  }

  return (
    <TopicSelectionView
      suggestedTopics={mockTopics}
      onSelectTopic={handleTopicSelect}
      onSelectImage={handleImageSelect}
    />
  );
}
