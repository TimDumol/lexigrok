import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css'; // Assuming global styles are here
import { routeTree } from './routeTree.gen';
import { AuthProvider, useAuth } from './lib/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/api/client';

const router = createRouter({
  routeTree,
  context: {
    auth: {} as AuthContextType,
  },
});

import { AuthContextType } from './lib/auth';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface RouterContext {
    auth: AuthContextType;
  }
}

function App() {
  const auth = useAuth();
  router.update({
    context: {
      auth,
    },
  });
  return <RouterProvider router={router} />;
}

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
