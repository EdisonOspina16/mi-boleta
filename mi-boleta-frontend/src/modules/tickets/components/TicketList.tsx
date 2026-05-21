'use client';

import { useEffect, useState } from 'react';
import { Ticket } from '@/types';
import { ticketService } from '../services/ticket.service';
import { TicketCard } from './TicketCard';
import { Button } from '@/components/UI/Button';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/UI/Input';
import { Modal } from '@/components/UI/Modal';
import { TicketForm } from './TicketForm';

export function TicketList({ admin = false }: { admin?: boolean }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = admin 
        ? await ticketService.getAdminTickets({ q: query, status: statusFilter })
        : await ticketService.getTickets({ q: query, status: statusFilter });
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [query, statusFilter]);

  const handleCreate = () => {
    setSelectedTicket(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (ticket: Ticket) => {
    if (admin) return; // Admins view-only in this simple list
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-black/30 p-4 rounded-2xl shadow-sm border border-white/10">
        <div className="relative w-full md:max-w-xs">
          <Input
            placeholder="Buscar por nombre o número..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Ganado">Ganado</option>
            <option value="Perdido">Perdido</option>
          </select>
          
          {!admin && (
            <Button className="flex items-center gap-2" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
              Nueva Boleta
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              onClick={() => handleEdit(ticket)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No se encontraron boletas</h3>
          <p className="mt-2 text-gray-500">Intenta con otros filtros o registra una nueva.</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTicket ? 'Editar Boleta' : 'Nueva Boleta'}
      >
        <TicketForm 
          initialData={selectedTicket}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchTickets();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
