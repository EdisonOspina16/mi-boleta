import { User, UserRole } from '@/types';

export function normalizeRole(role: unknown): UserRole {
  if (typeof role === 'string' && role.toLowerCase() === 'admin') {
    return 'admin';
  }
  return 'user';
}

export function normalizeUser(user: User): User {
  return { ...user, role: normalizeRole(user.role) };
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return normalizeUser(JSON.parse(raw) as User);
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setAuthSession(token: string, user: User) {
  const normalized = normalizeUser(user);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(normalized));
}

export function clearAuthSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function isAdmin(user: User | null | undefined): boolean {
  return user?.role === 'admin';
}
