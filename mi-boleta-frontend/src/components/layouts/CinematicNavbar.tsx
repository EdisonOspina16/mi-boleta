'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Ticket, LayoutDashboard, Shield, LogOut } from 'lucide-react';
import { cn } from '@/components/UI/utils';
import { Button } from '@/components/UI/Button';
import { User } from '@/types';
import { clearAuthSession, getStoredUser } from '@/lib/auth';

export function CinematicNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getStoredUser());
  }, [pathname]);

  const handleLogout = () => {
    clearAuthSession();
    router.push('/auth/login');
    router.refresh();
  };

  if (pathname.includes('/auth/')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform group-hover:scale-110 duration-300">
                <Ticket className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white group-hover:text-amber-400 transition-colors duration-300">
                  WHAT IF
                </span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-amber-500 -mt-1.5 uppercase">
                  I Actually Won?
                </span>
              </div>
            </Link>

            {/* Authenticated Links (Desktop) */}
            {user && (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                    pathname === '/dashboard'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-200 hover:bg-white/5 hover:text-amber-400'
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/tickets"
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                    pathname === '/tickets'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-200 hover:bg-white/5 hover:text-amber-400'
                  )}
                >
                  <Ticket className="h-4 w-4" />
                  Mis Boletas
                </Link>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                      pathname === '/admin'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'text-slate-200 hover:bg-white/5 hover:text-amber-400'
                    )}
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Navigation Items / CTA */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-white">{user.name}</span>
                  <span className="text-[10px] text-amber-500 font-mono capitalize tracking-wider">{user.role}</span>
                </div>
                
                <div className="h-10 w-10 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)] font-bold uppercase">
                  {user.name.substring(0, 2)}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-red-400 hover:bg-white/5"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href="/auth/login">
                  <button className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors">
                    Iniciar Sesión
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="relative px-5 py-2 text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                    Registrarse
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
