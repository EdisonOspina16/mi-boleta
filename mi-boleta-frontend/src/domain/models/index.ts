export interface TicketModel {
  id: string;
  title: string;
  gameType: string;
  gameNumber?: string;
  gameDate: Date;
  amount?: number;
  place?: string;
  status: string;
  notes?: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}
