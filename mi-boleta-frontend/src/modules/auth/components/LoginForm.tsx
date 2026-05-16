'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button';
import { authService } from '../services/auth.service';

const loginSchema = z.object({
  email: z.string().email('Email no válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const { token, user } = await authService.login(values);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="relative">
        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="tu@email.com"
          {...register('email')}
          error={errors.email?.message}
          className="pl-10"
        />
        <Mail className="absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
      </div>

      <div className="relative">
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
          className="pl-10"
        />
        <Lock className="absolute left-3 top-[38px] h-5 w-5 text-gray-400" />
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Iniciar Sesión
      </Button>
    </form>
  );
}
