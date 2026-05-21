'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { Ticket, GameType, TicketStatus } from '@/types';
import { ticketService } from '../services/ticket.service';

const ticketSchema = z.object({
  title: z.string().min(3, 'El nombre del sorteo es obligatorio'),
  gameType: z.enum(['Lotería', 'Rifa', 'Sorteo', 'Boleta', 'Juego ocasional']),
  gameNumber: z.string().optional(),
  gameDate: z.string().min(1, 'La fecha es obligatoria'),
  amount: z.number().optional(),
  place: z.string().optional(),
  status: z.enum(['Pendiente', 'Ganado', 'Perdido']),
  notes: z.string().optional(),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  initialData?: Ticket;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TicketForm({ initialData, onSuccess, onCancel }: TicketFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: initialData ? {
      ...initialData,
      gameDate: new Date(initialData.gameDate).toISOString().split('T')[0],
      amount: initialData.amount ? Number(initialData.amount) : undefined,
    } as any : {
      status: 'Pendiente',
      gameType: 'Lotería',
    },
  });

  const onSubmit = async (values: TicketFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      if (initialData) {
        await ticketService.updateTicket(initialData.id, values);
      } else {
        await ticketService.createTicket(values);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar la boleta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre del Sorteo"
          placeholder="Ej. Lotería de Medellín"
          {...register('title')}
          error={errors.title?.message}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-200 ml-1">Tipo de Juego</label>
          <select
            {...register('gameType')}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none [&>option]:bg-[#0a0a12] [&>option]:text-white"
          >
            <option value="Lotería">Lotería</option>
            <option value="Rifa">Rifa</option>
            <option value="Sorteo">Sorteo</option>
            <option value="Boleta">Boleta</option>
            <option value="Juego ocasional">Juego ocasional</option>
          </select>
        </div>

        <Input
          label="Número Jugado"
          placeholder="Ej. 1234"
          {...register('gameNumber')}
          error={errors.gameNumber?.message}
        />

        <Input
          label="Fecha del Sorteo"
          type="date"
          {...register('gameDate')}
          error={errors.gameDate?.message}
        />

        <Input
          label="Valor Apostado"
          type="number"
          placeholder="Ej. 5000"
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />

        <Input
          label="Lugar de Compra"
          placeholder="Ej. Tienda la esquina"
          {...register('place')}
          error={errors.place?.message}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-200 ml-1">Estado</label>
          <select
            {...register('status')}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none [&>option]:bg-[#0a0a12] [&>option]:text-white"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Ganado">Ganado</option>
            <option value="Perdido">Perdido</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-200 ml-1">Notas Adicionales</label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Ej. Premio: Carro último modelo"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 outline-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Actualizar Boleta' : 'Guardar Boleta'}
        </Button>
      </div>
    </form>
  );
}
