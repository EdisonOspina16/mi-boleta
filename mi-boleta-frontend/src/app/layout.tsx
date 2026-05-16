import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layouts/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Boleta | Administra tus sorteos y juegos",
  description: "La plataforma definitiva para gestionar tus boletas, rifas y loterías. ¿Y si sí te lo ganaste?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <footer className="border-t border-gray-100 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mi Boleta. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
