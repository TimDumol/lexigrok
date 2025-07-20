import { render, screen, fireEvent } from '@testing-library/react';
import { test, vi } from 'vitest';
import SignupComponent from '../../routes/signup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@/lib/api/client', () => ({
  apiClient: {
    POST: vi.fn(),
    setHeaders: vi.fn(),
  },
}));

vi.mock('@/lib/auth', () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}));

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: () => <span />,
  };
});

const queryClient = new QueryClient();

test('Signup component renders and handles signup', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <SignupComponent />
    </QueryClientProvider>
  );

  fireEvent.change(screen.getByLabelText('Username'), {
    target: { value: 'testuser' },
  });
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'password' },
  });

  fireEvent.click(screen.getByTestId('signup-button'));
});
