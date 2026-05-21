import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { LoginForm } from '@/modules/auth/components/LoginForm';
import { Card } from '@/components/UI/Card';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Ticket className="h-10 w-10 stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="mt-2 text-slate-300 text-sm">
            Ingresa tus credenciales para administrar tus boletas
          </p>
        </div>

        <Card className="shadow-2xl shadow-black/50 border-white/10 bg-black/40 backdrop-blur-md">
          <LoginForm />
        </Card>

        <p className="text-center text-sm text-slate-300">
          ¿No tienes una cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
