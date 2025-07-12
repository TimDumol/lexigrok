import { createFileRoute } from '@tanstack/react-router';
import PracticeView from '@/components/PracticeView';
import React from 'react';
import { z } from 'zod';

// Updated search params schema to include optional imageUrl
const practiceSearchSchema = z.object({
  topicId: z.string().optional().default('general'),
  topicName: z.string().optional().default('General Practice'),
  imageUrl: z.string().optional(), // imageUrl is optional
});

export const Route = createFileRoute('/practice')({
  validateSearch: practiceSearchSchema,
  component: PracticeComponent,
});

function PracticeComponent() {
  const { topicId, topicName, imageUrl } = Route.useSearch();

  return (
    <PracticeView
      currentTopicId={topicId}
      currentTopicName={topicName}
      imageUrl={imageUrl} // Pass imageUrl to the component
    />
  );
}
