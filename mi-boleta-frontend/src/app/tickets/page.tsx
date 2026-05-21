'use client';

import { TicketList } from '@/modules/tickets/components/TicketList';

export default function TicketsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Mis Boletas</h1>
        <p className="mt-2 text-gray-300">Administra, filtra y consulta todos tus juegos de azar.</p>
      </header>

      <TicketList />
    </div>
  );
}
