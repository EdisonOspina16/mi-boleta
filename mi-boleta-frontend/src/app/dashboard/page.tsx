'use client';

import { useEffect, useState } from 'react';
import { Ticket, User } from '@/types';
import { ticketService } from '@/modules/tickets/services/ticket.service';
import { Card } from '@/components/UI/Card';
import { TicketCard } from '@/modules/tickets/components/TicketCard';
import { Trophy, Clock, History, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/components/UI/utils';

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchData = async () => {
      try {
        const response = await ticketService.getTickets({ pageSize: 50 });
        setTickets(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = {
    total: tickets.length,
    pending: tickets.filter(t => t.status === 'Pendiente').length,
    won: tickets.filter(t => t.status === 'Ganado').length,
    totalAmount: tickets.reduce((acc, t) => acc + (Number(t.amount) || 0), 0),
  };

  const upcomingTickets = [...tickets]
    .filter(t => t.status === 'Pendiente')
    .sort((a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime())
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Hola, {user?.name || 'Usuario'} 👋</h1>
        <p className="mt-2 text-gray-300">Aquí tienes un resumen de tus juegos y sorteos.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Jugados" value={stats.total} icon={History} color="text-amber-500" bg="bg-black/30 backdrop-blur-md border border-white/10" />
        <StatCard title="Pendientes" value={stats.pending} icon={Clock} color="text-amber-500" bg="bg-black/30 backdrop-blur-md border border-white/10" />
        <StatCard title="Ganados" value={stats.won} icon={Trophy} color="text-emerald-500" bg="bg-black/30 backdrop-blur-md border border-white/10" />
        <StatCard title="Inversión Total" value={`$${stats.totalAmount.toLocaleString()}`} icon={TrendingUp} color="text-emerald-500" bg="bg-black/30 backdrop-blur-md border border-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Próximos Sorteos
            </h2>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
            </div>
          ) : upcomingTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 text-gray-300 border-2 border-dashed bg-black/20 backdrop-blur-sm border-white/10">
              No tienes sorteos próximos. ¡Anímate a jugar!
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
          <Card className="p-0 overflow-hidden bg-black/30 border border-white/10">
            <div className="divide-y divide-white/5">
              {tickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                  <div>
                    <p className="font-semibold text-white">{ticket.title}</p>
                    <p className="text-xs text-gray-400">{new Date(ticket.gameDate).toLocaleDateString()}</p>
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    ticket.status === 'Ganado' ? 'bg-green-900/30 text-green-400' : 
                    ticket.status === 'Perdido' ? 'bg-red-900/30 text-red-400' : 'bg-amber-900/30 text-amber-400'
                  )}>
                    {ticket.status}
                  </span>
                </div>
              ))}
              {tickets.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-sm">Sin actividad</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <Card className="flex items-center gap-4 bg-black/30 backdrop-blur-md border border-white/10">
      <div className={cn("p-3 rounded-xl", bg)}>
        <Icon className={cn("h-6 w-6", color)} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </Card>
  );
}
