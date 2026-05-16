export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export type TicketStatus = 'Pendiente' | 'Ganado' | 'Perdido';
export type GameType = 'Lotería' | 'Rifa' | 'Sorteo' | 'Boleta' | 'Juego ocasional';

export interface Ticket {
  id: string;
  title: string;
  gameType: GameType;
  gameNumber?: string;
  gameDate: string;
  amount?: number;
  place?: string;
  status: TicketStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
