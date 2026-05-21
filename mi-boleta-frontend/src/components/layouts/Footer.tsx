'use client';

import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Hide the global footer on the homepage and authentication routes
  if (pathname === '/' || pathname.includes('/auth/')) {
    return null;
  }

  return (
    <footer className="border-t border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Mi Boleta. Todos los derechos reservados.
      </div>
    </footer>
  );
}
