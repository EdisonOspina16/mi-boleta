import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { LoginForm } from '@/modules/auth/components/LoginForm';
import { Card } from '@/components/UI/Card';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
            <Ticket className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="mt-2 text-gray-500">
            Ingresa tus credenciales para administrar tus boletas
          </p>
        </div>

        <Card className="shadow-xl">
          <LoginForm />
        </Card>

        <p className="text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <Link
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
