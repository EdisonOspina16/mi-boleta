'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import { getStoredToken, getStoredUser, isAdmin } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    setReady(true);
  }, []);

  return { user, ready, isAdmin: isAdmin(user) };
}

export function useRequireAuth(redirectTo = '/auth/login') {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (!getStoredToken()) {
      router.replace(redirectTo);
    }
  }, [ready, redirectTo, router]);

  return { user, ready, isAuthenticated: !!getStoredToken() };
}

export function useRequireAdmin() {
  const router = useRouter();
  const { user, ready, isAdmin: admin } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (!getStoredToken()) {
      router.replace('/auth/login');
      return;
    }
    if (!admin) {
      router.replace('/dashboard');
    }
  }, [ready, admin, router]);

  return { user, ready, isAdmin: admin };
}
