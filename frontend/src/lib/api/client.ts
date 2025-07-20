import { QueryClient } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { type paths } from './schema';

const apiClient = createClient<paths>({
  baseUrl: 'http://localhost:8000',
});

const queryClient = new QueryClient();

export { apiClient, queryClient };
