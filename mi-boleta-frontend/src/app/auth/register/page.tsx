import Link from 'next/link';
import { Ticket } from 'lucide-react';
import { RegisterForm } from '@/modules/auth/components/RegisterForm';
import { Card } from '@/components/UI/Card';

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
            <Ticket className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Crea tu cuenta
          </h1>
          <p className="mt-2 text-gray-500">
            Empieza a gestionar tus rifas y sorteos hoy mismo
          </p>
        </div>

        <Card className="shadow-xl">
          <RegisterForm />
        </Card>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <Link
            href="/auth/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
