import { useAuth } from '@/lib/authHooks';
import { apiClient } from '@/lib/api/client';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
});

export default function SignupComponent() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      return apiClient.POST('/users/', {
        body: {
          username,
          password,
          email,
        },
      });
    },
    onSuccess: () => {
      // Log in the user after successful signup
      return apiClient.POST('/token', {
        body: {
          username,
          password,
          scope: '',
        },
      }).then(response => {
        if (response.data) {
          auth.login(response.data.access_token);
          navigate({ to: '/' });
        }
      })
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Button type="submit" disabled={mutation.isPending} data-testid="signup-button">
          {mutation.isPending ? 'Signing up...' : 'Sign Up'}
        </Button>
        {mutation.isError && (
          <p className="text-red-500">
            {mutation.error.message || 'An error occurred'}
          </p>
        )}
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
}
