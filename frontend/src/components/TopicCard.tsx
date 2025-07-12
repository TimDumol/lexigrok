import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming shadcn UI path
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Assuming shadcn UI path

export interface Topic { // Exporting Topic to be used elsewhere
  id: string;
  name: string;
  description?: string;
  // imageUrl?: string; // Optional image for the card
}

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  return (
    <Card className="w-full sm:w-[300px] md:w-[350px] flex flex-col">
      <CardHeader>
        <CardTitle>{topic.name}</CardTitle>
        {topic.description && (
          <CardDescription>{topic.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {/* If there was more content like an image, it could go here */}
        {/* {topic.imageUrl && <img src={topic.imageUrl} alt={topic.name} className="rounded-md object-cover h-48 w-full" />} */}
      </CardContent>
      <CardFooter className="mt-auto"> {/* Pushes footer to the bottom if card content is variable */}
        <Button onClick={() => onSelect(topic)} className="w-full">
          Select Topic
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
