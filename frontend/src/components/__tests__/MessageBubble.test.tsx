import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MessageBubble from '../MessageBubble';
import { describe, it, expect, vi } from 'vitest';

describe('MessageBubble', () => {
  const message = {
    id: '1',
    text: 'Hello world',
    sender: 'bot' as const,
  };

  it('renders the message text', () => {
    const { getByText } = render(
      <MessageBubble
        message={message}
        onWordClick={() => {}}
        selectedWordIndexes={[]}
      />
    );
    expect(getByText('Hello')).toBeInTheDocument();
    expect(getByText('world')).toBeInTheDocument();
  });

  it('calls onWordClick with the correct word and index when a word is clicked', () => {
    const onWordClick = vi.fn();
    const { getByText } = render(
      <MessageBubble
        message={message}
        onWordClick={onWordClick}
        selectedWordIndexes={[]}
      />
    );

    fireEvent.click(getByText('Hello'));
    expect(onWordClick).toHaveBeenCalledWith('Hello', 0);

    fireEvent.click(getByText('world'));
    expect(onWordClick).toHaveBeenCalledWith('world', 2);
  });

  it('highlights selected words', () => {
    const { getByText } = render(
      <MessageBubble
        message={message}
        onWordClick={() => {}}
        selectedWordIndexes={[0]}
      />
    );
    expect(getByText('Hello')).toHaveClass('bg-blue-300');
    expect(getByText('world')).not.toHaveClass('bg-blue-300');
  });
});
