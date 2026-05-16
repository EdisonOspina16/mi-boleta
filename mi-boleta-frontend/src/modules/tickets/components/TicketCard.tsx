import { Calendar, MapPin, Tag, Trophy, Clock, XCircle } from 'lucide-react';
import { Ticket, TicketStatus } from '@/types';
import { Card } from '@/components/UI/Card';
import { cn } from '@/components/UI/utils';

interface TicketCardProps {
  ticket: Ticket;
  onClick?: (ticket: Ticket) => void;
}

const statusConfig: Record<TicketStatus, { icon: any; color: string; bg: string }> = {
  Pendiente: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  Ganado: { icon: Trophy, color: 'text-green-600', bg: 'bg-green-50' },
  Perdido: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
};

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const status = statusConfig[ticket.status];
  const Icon = status.icon;

  return (
    <Card
      className="group cursor-pointer border-l-4 border-l-transparent transition-all hover:border-l-indigo-600 hover:shadow-lg active:scale-[0.98]"
      onClick={() => onClick?.(ticket)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {ticket.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <Tag className="h-3.5 w-3.5" />
              <span>{ticket.gameType}</span>
            </div>
          </div>
          <div className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider', status.bg, status.color)}>
            <Icon className="h-3.5 w-3.5" />
            {ticket.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span>{new Date(ticket.gameDate).toLocaleDateString()}</span>
          </div>
          {ticket.gameNumber && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-bold text-indigo-600">#{ticket.gameNumber}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[150px]">{ticket.place || 'Lugar no especificado'}</span>
          </div>
          {ticket.amount && (
            <span className="text-lg font-bold text-gray-900">
              ${Number(ticket.amount).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
