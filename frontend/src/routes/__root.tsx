import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/lib/authHooks';
import { Button } from '@/components/ui/button';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        {isAuthenticated && (
          <Link to="/practice" className="[&.active]:font-bold">
            Practice
          </Link>
        )}
        <div className="flex-grow" />
        {isAuthenticated ? (
          <Button onClick={logout} variant="ghost">
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            <Link to="/signup" className="[&.active]:font-bold">
              Sign Up
            </Link>
          </>
        )}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
