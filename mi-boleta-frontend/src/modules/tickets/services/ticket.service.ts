import { api } from '@/modules/auth/services/api';
import { Ticket, PaginatedResponse } from '@/types';

export const ticketService = {
  getTickets: async (params?: any) => {
    const { data } = await api.get<PaginatedResponse<Ticket>>('/tickets', { params });
    return data;
  },
  getTicketById: async (id: string) => {
    const { data } = await api.get<{ data: Ticket }>(`/tickets/${id}`);
    return data.data;
  },
  createTicket: async (ticketData: any) => {
    const { data } = await api.post<{ data: Ticket }>('/tickets', ticketData);
    return data.data;
  },
  updateTicket: async (id: string, ticketData: any) => {
    const { data } = await api.put<{ data: Ticket }>(`/tickets/${id}`, ticketData);
    return data.data;
  },
  deleteTicket: async (id: string) => {
    await api.delete(`/tickets/${id}`);
  },
  getAdminTickets: async (params?: any) => {
    const { data } = await api.get<PaginatedResponse<Ticket>>('/admin/tickets', { params });
    return data;
  },
};
