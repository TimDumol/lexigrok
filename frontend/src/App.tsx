import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useAuth } from './lib/authHooks';

const router = createRouter({
  routeTree,
  context: {
    auth: {} as import('./lib/auth').AuthContextType,
  },
});

export default function App() {
  const auth = useAuth();
  router.update({
    context: {
      auth,
    },
  });
  return <RouterProvider router={router} />;
}
