'use client';

import { TicketList } from '@/modules/tickets/components/TicketList';
import { useRequireAuth } from '@/hooks/useAuth';

export default function TicketsPage() {
  const { ready, isAuthenticated } = useRequireAuth();

  if (!ready || !isAuthenticated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-slate-300">
        Cargando…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Mis Boletas</h1>
        <p className="mt-2 text-slate-300">Administra, filtra y consulta todos tus juegos de azar.</p>
      </header>

      <TicketList />
    </div>
  );
}
