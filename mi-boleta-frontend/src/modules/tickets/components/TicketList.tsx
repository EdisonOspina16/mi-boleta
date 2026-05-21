'use client';

import { useEffect, useState } from 'react';
import { Ticket } from '@/types';
import { ticketService } from '../services/ticket.service';
import { TicketCard } from './TicketCard';
import { Button } from '@/components/UI/Button';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/UI/Input';
import { Modal } from '@/components/UI/Modal';
import { TicketForm } from './TicketForm';

const USER_PAGE_SIZE = 20;
const ADMIN_PAGE_SIZE = 100;

export function TicketList({ admin = false }: { admin?: boolean }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = admin ? ADMIN_PAGE_SIZE : USER_PAGE_SIZE;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const params = { q: query, status: statusFilter, page, pageSize };
      const response = admin
        ? await ticketService.getAdminTickets(params)
        : await ticketService.getTickets(params);
      setTickets(response.data);
      setTotal(response.meta.total);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter, admin]);

  useEffect(() => {
    fetchTickets();
  }, [query, statusFilter, page, admin]);

  const handleCreate = () => {
    setSelectedTicket(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (ticket: Ticket) => {
    if (admin) return;
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, total);

  return (
    <div className="space-y-6">
      {admin && total > 0 && (
        <p className="text-sm font-semibold text-amber-300">
          {total.toLocaleString()} boletas en la plataforma
        </p>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-black/30 p-4 rounded-2xl shadow-sm border border-white/10">
        <div className="relative w-full md:max-w-xs">
          <Input
            placeholder="Buscar por nombre o número..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none [&>option]:bg-[#0a0a12] [&>option]:text-white"
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => handleEdit(ticket)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <p className="text-sm text-slate-200">
                Mostrando {rangeStart}–{rangeEnd} de {total.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <span className="text-sm text-slate-200 px-2">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="flex items-center gap-1"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-black/30 rounded-2xl border-2 border-dashed border-white/10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-400">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">No se encontraron boletas</h3>
          <p className="mt-2 text-slate-300">Intenta con otros filtros o registra una nueva.</p>
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
