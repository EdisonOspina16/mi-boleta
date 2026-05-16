import Link from 'next/link';
import { Ticket, ShieldCheck, Clock, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-[100%] blur-3xl -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-200">
            <Ticket className="h-12 w-12" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-7xl">
            ¿Y si sí me lo <span className="text-indigo-600">gané?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
            No vuelvas a perder un premio por olvido. Administra tus boletas, rifas y sorteos en un solo lugar de forma segura y moderna.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="h-14 px-8 text-lg rounded-2xl w-full sm:w-auto">
                Empezar ahora gratis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-2xl w-full sm:w-auto">
                Ya tengo una cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Todo lo que necesitas</h2>
            <p className="mt-4 text-gray-600">Diseñado para que nunca más te preguntes si ganaste.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldCheck} 
              title="Registro Seguro" 
              description="Guarda todos los detalles de tus jugadas: número, fecha, lugar y valor apostado." 
            />
            <FeatureCard 
              icon={Clock} 
              title="Recordatorios" 
              description="Mantén un control total de tus próximos sorteos y fechas importantes." 
            />
            <FeatureCard 
              icon={Search} 
              title="Búsqueda Inteligente" 
              description="Encuentra cualquier boleta por nombre o número en segundos." 
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Numbers */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="bg-indigo-900 text-white p-12 overflow-hidden relative">
            <div className="absolute right-0 bottom-0 opacity-10 -mr-20 -mb-20">
              <Ticket className="w-80 h-80 rotate-12" />
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl">Únete a miles de ganadores</h2>
                <p className="mt-4 text-indigo-100 text-lg">
                  La organización es el primer paso hacia la suerte. No dejes que tus premios se pierdan en el olvido.
                </p>
                <div className="mt-8 flex gap-8">
                  <div>
                    <p className="text-4xl font-bold">10k+</p>
                    <p className="text-indigo-300 text-sm">Usuarios activos</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold">50k+</p>
                    <p className="text-indigo-300 text-sm">Boletas registradas</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link href="/auth/register">
                  <Button variant="secondary" size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50">
                    ¡Registrar mi primera boleta!
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <Card className="hover:shadow-xl transition-shadow border-none shadow-indigo-100">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </Card>
  );
}
