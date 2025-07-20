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
        onTextSelection={vi.fn()}
      />
    );
    expect(getByText('Hello')).toBeInTheDocument();
    expect(getByText('world')).toBeInTheDocument();
  });

  it('calls onTextSelection with the selected text when a word is clicked', () => {
    const onTextSelection = vi.fn();
    const { getByText } = render(
      <MessageBubble
        message={message}
        onTextSelection={onTextSelection}
      />
    );

    fireEvent.click(getByText('Hello'));
    expect(onTextSelection).toHaveBeenCalledWith('Hello');
  });

  it('highlights selected words', () => {
    const { getByText } = render(
      <MessageBubble
        message={message}
        onTextSelection={vi.fn()}
      />
    );

    fireEvent.click(getByText('Hello'));
    expect(getByText('Hello')).toHaveClass('bg-blue-300');
    expect(getByText('world')).not.toHaveClass('bg-blue-300');
  });
});
