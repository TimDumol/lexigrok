import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assuming global styles are here
import { AuthProvider } from './lib/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/api/client';
import App from './App';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
