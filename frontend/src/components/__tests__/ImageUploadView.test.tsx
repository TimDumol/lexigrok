import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUploadView from '../ImageUploadView';
import { vi, expect, it, describe, beforeEach } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('ImageUploadView', () => {
  const onImageSelected = vi.fn();
  const onCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ImageUploadView onImageSelected={onImageSelected} onCancel={onCancel} />);
    expect(screen.getByText('Practice with an Image')).toBeInTheDocument();
    expect(screen.getByText('Click or drag & drop to upload')).toBeInTheDocument();
  });

  it('handles file selection and preview', async () => {
    render(<ImageUploadView onImageSelected={onImageSelected} onCancel={onCancel} />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('file-input');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByAltText('Selected preview')).toBeInTheDocument();
    });
  });

  it('uploads a file and calls onImageSelected', async () => {
    // Arrange
    const mockPresignedUrl = 'http://presigned-url.com';
    const mockObjectName = 'images/chucknorris.png';
    const finalImageUrl = `/api/images/${mockObjectName}`;

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ url: mockPresignedUrl, object_name: mockObjectName }),
    });

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
    });


    render(<ImageUploadView onImageSelected={onImageSelected} onCancel={onCancel} />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByTestId('file-input');

    Object.defineProperty(input, 'files', {
      value: [file],
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByAltText('Selected preview')).toBeInTheDocument();
    });

    const startButton = screen.getByText('Start Practice');
    fireEvent.click(startButton);


    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`/api/upload/image?file_name=${encodeURIComponent(file.name)}`);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(mockPresignedUrl, expect.any(Object));
    });

    await waitFor(() => {
      expect(onImageSelected).toHaveBeenCalledWith(finalImageUrl);
    });
  });
});
