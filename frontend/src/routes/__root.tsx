import React from 'react';
import { Outlet, Link } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'; // Optional, for debugging

export const Route = ({ component: RootLayout }); // This matches the file-based routing convention

function RootLayout() {
  return (
    <>
      <header className="p-4 bg-gray-100 border-b">
        <nav className="flex gap-4">
          <Link to="/" className="[&.active]:font-bold">
            Topics
          </Link>
          <Link to="/practice" className="[&.active]:font-bold">
            Practice
          </Link>
          {/* Add other global navigation links here */}
        </nav>
      </header>
      <hr />
      <main className="p-4">
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
