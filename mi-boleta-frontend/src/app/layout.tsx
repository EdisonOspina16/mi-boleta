import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { CinematicNavbar } from "@/components/layouts/CinematicNavbar";
import { Footer } from "@/components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What If I Actually Won? | Mi Boleta",
  description: "No dejes que tu suerte se pierda en el olvido. La plataforma definitiva y premium para gestionar y rastrear tus boletas, rifas y loterías. ¿Y si sí te lo ganaste?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full bg-[#030307] text-white antialiased`}>
        <CinematicNavbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
