'use client';

import { TicketList } from '@/modules/tickets/components/TicketList';
import { Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <header className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg">
          <Shield className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administrador</h1>
          <p className="mt-1 text-gray-600">Visualiza y gestiona todos los registros de la plataforma.</p>
        </div>
      </header>

      <TicketList admin />
    </div>
  );
}
