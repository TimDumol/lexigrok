import { createFileRoute } from '@tanstack/react-router';
import PracticeView from '@/components/PracticeView';
import React from 'react';
import { z } from 'zod';

// Define search params schema for type safety and defaults
const practiceSearchSchema = z.object({
  topicId: z.string().optional().default('general'),
  topicName: z.string().optional().default('General Practice'),
});

export const Route = createFileRoute('/practice')({
  validateSearch: practiceSearchSchema, // Validate and parse search params
  component: PracticeComponent,
});

function PracticeComponent() {
  // topicId and topicName will have default values if not provided in search params
  const { topicId, topicName } = Route.useSearch();

  return (
    // The PracticeView component itself now includes a header with a "Change Topic" link
    // and displays the topic name, so the outer div and link here might be redundant
    // depending on final layout decisions. For now, PracticeView handles its own header.
    <PracticeView
      currentTopicId={topicId}
      currentTopicName={topicName}
    />
  );
}
