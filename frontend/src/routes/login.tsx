import { useAuth } from '@/lib/authHooks';
import { apiClient } from '@/lib/api/client';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

export default function LoginComponent() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      return apiClient.POST('/token', {
        body: {
          username,
          password,
          scope: '',
        },
      });
    },
    onSuccess: (response) => {
      if (response.data) {
        auth.login(response.data.access_token);
        navigate({ to: '/' });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={mutation.isPending} data-testid="login-button">
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
        {mutation.isError && (
          <p className="text-red-500">
            {mutation.error.message || 'An error occurred'}
          </p>
        )}
      </form>
    </div>
  );
}
