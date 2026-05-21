'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Ticket, 
  ShieldCheck, 
  Clock, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Bell, 
  Lock, 
  Filter, 
  TrendingUp, 
  Layers, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CinematicNavbar } from '@/components/layouts/CinematicNavbar';
import { cn } from '@/components/UI/utils';

// Register GSAP ScrollTrigger safely in SSR environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ----------------------------------------------------
// GOLD PARTICLE CANVAS COMPONENT
// ----------------------------------------------------
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: width / 2, y: height / 2, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle class definition
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;
      fadeSpeed: number = 0;
      baseColor: string = '';

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = -(Math.random() * 0.8 + 0.2);
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        // Warm gold and bright white particle variations
        this.baseColor = Math.random() > 0.3 ? '234, 179, 8' : '255, 255, 255';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Soft pull towards mouse if active
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            this.x += (dx / distance) * 0.45;
            this.y += (dy / distance) * 0.45;
          }
        }

        // Slow fade out
        this.opacity -= this.fadeSpeed;

        if (this.y < -10 || this.opacity <= 0 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = `rgba(${this.baseColor}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      }
    }

    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-70" />;
}

// ----------------------------------------------------
// TICKET COUNTDOWN COMPONENT
// ----------------------------------------------------
function DigitalCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hrs: 14, mins: 32, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { hrs: prev.hrs, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hrs > 0) {
          return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        } else {
          return { hrs: 23, mins: 59, secs: 59 }; // Reset loop for demo
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex gap-3 justify-center items-center font-mono">
      <div className="flex flex-col items-center">
        <div className="bg-[#0b0b14] border border-amber-500/20 text-amber-400 font-bold text-2xl sm:text-4xl px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          {formatNum(timeLeft.hrs)}
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Horas</span>
      </div>
      <div className="text-amber-500 font-bold text-3xl animate-pulse -mt-4">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-[#0b0b14] border border-amber-500/20 text-amber-400 font-bold text-2xl sm:text-4xl px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          {formatNum(timeLeft.mins)}
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Minutos</span>
      </div>
      <div className="text-amber-500 font-bold text-3xl animate-pulse -mt-4">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-[#0b0b14] border border-amber-500/20 text-amber-400 font-bold text-2xl sm:text-4xl px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          {formatNum(timeLeft.secs)}
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Segundos</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN HOME PAGE COMPONENT
// ----------------------------------------------------
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ticketNumbers, setTicketNumbers] = useState([14, 27, 33, 45, 59]);
  const [luckyNumber, setLuckyNumber] = useState(7);
  const [isShuffling, setIsShuffling] = useState(false);
  
  // Dashboard mock states
  const [activeTab, setActiveTab] = useState<'main' | 'search' | 'alerts' | 'admin'>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [smsToggle, setSmsToggle] = useState(true);
  const [aiToggle, setAiToggle] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // References for GSAP scroll trigger elements
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Initial page load animations (Framer is doing core reveals, GSAP handles scroll floating)
    if (typeof window !== 'undefined') {
      const items = gsap.utils.toArray('.scroll-float');
      items.forEach((item: any, i) => {
        gsap.fromTo(item,
          { 
            y: Math.random() * 40 + 20, 
            rotation: Math.random() * 15 - 7.5,
            opacity: 0.3
          },
          {
            y: Math.random() * -60 - 40,
            rotation: Math.random() * 30 - 15,
            opacity: 0.9,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            }
          }
        );
      });

      // Background color shift on scroll
      gsap.to('.cinematic-container', {
        backgroundColor: '#07050e',
        scrollTrigger: {
          trigger: '.upcoming-draws-section',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        }
      });
    }
  }, []);

  // 3D Ticket mouse tilt effect
  const handleTicketMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation (-15 to 15 degrees max)
    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    
    // Move reflective radial shine
    const glow = card.querySelector('.ticket-shine') as HTMLDivElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245, 158, 11, 0.22) 0%, transparent 60%)`;
    }
  };

  const handleTicketMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    const glow = card.querySelector('.ticket-shine') as HTMLDivElement;
    if (glow) {
      glow.style.background = 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 70%)';
    }
  };

  // Shuffle ticket numbers animation
  const handleShuffleNumbers = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setTicketNumbers(ticketNumbers.map(() => Math.floor(Math.random() * 60) + 1));
      setLuckyNumber(Math.floor(Math.random() * 10) + 1);
      iterations++;
      if (iterations > 12) {
        clearInterval(interval);
        // Lock final lucky winning set
        setTicketNumbers([14, 27, 33, 45, 59]);
        setLuckyNumber(7);
        setIsShuffling(false);
        showToast('¡Combinación ganadora oficial sincronizada!');
      }
    }, 80);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter mock tickets for the Search Dashboard component
  const mockSearchTickets = [
    { name: 'Powerball Semanal', numbers: '14 - 27 - 33 - 45 - 59 [7]', date: '2026-05-24', status: 'Pendiente' },
    { name: 'Sorteo Extraordinario', numbers: '08 - 19 - 22 - 31 - 50 [4]', date: '2026-05-28', status: 'Confirmado' },
    { name: 'Rifa Anual UDEM', numbers: '24561', date: '2026-06-15', status: 'Activo' },
    { name: 'Mega Millions', numbers: '05 - 12 - 28 - 43 - 61 [15]', date: '2026-05-30', status: 'Registrado' },
  ];

  const filteredTickets = mockSearchTickets.filter(
    (t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.numbers.includes(searchQuery)
  );

  return (
    <div ref={scrollRef} className="cinematic-container relative min-h-screen bg-[#030307] text-white overflow-hidden -mt-16 pt-16">
      <CinematicNavbar />
      
      {/* Interactive canvas gold dust background */}
      <ParticleCanvas />

      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse duration-[8s]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating physical elements in background via parallax */}
      <div className="absolute top-[22%] left-[10%] scroll-float pointer-events-none z-10 w-24 h-14 bg-gradient-to-tr from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-md rotate-[14deg] flex items-center justify-center backdrop-blur-sm">
        <Ticket className="w-8 h-8 text-amber-500/30" />
      </div>
      <div className="absolute top-[35%] right-[12%] scroll-float pointer-events-none z-10 w-16 h-16 bg-gradient-to-bl from-indigo-500/15 to-purple-500/5 border border-indigo-500/20 rounded-full -rotate-[22deg] flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.1)]">
        <Sparkles className="w-6 h-6 text-indigo-400/30 animate-spin duration-[10s]" />
      </div>
      <div className="absolute top-[75%] left-[8%] scroll-float pointer-events-none z-10 w-20 h-10 bg-gradient-to-r from-amber-500/10 to-yellow-600/5 border border-amber-500/15 rounded rotate-[-8deg] flex items-center justify-center backdrop-blur-sm">
        <span className="text-[10px] text-amber-500/20 font-mono tracking-widest font-bold">$$$$</span>
      </div>

      {/* Floating toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 glass-panel-gold border-amber-500/40 text-amber-400 font-bold px-6 py-4 rounded-xl flex items-center gap-3 shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
          >
            <Sparkles className="h-5 w-5 animate-pulse text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------
          SECTION 1: HERO SECTION
      ---------------------------------------------------- */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 pt-10 sm:pt-20 pb-16 z-20">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-cosmic-grid opacity-40 pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col text-center lg:text-left"
          >
            <div className="inline-flex self-center lg:self-start items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-widest mb-6 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>NUNCA MÁS PIERDAS UN PREMIO</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black tracking-tight leading-[1.05]">
              ¿Y si realmente <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-glow-gold">
                te lo ganaste?
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              El 7% de los premios de loterías y rifas quedan sin reclamar cada año en el mundo por simple olvido. Sigue, gestiona y recibe alertas automáticas para que nunca más dejes tu suerte en la sombra.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <button className="w-full relative group px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-2xl text-black font-black text-lg transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] active:scale-95 flex items-center justify-center gap-2">
                  <span>Empezar Gratis</span>
                  <ArrowRight className="h-5 w-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 glass-panel border-white/10 hover:border-amber-500/40 text-slate-200 hover:text-white rounded-2xl font-bold transition-all duration-300">
                  Ver cómo funciona
                </button>
              </a>
            </div>
            
            {/* Realtime stats badge */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 border-t border-white/5 pt-8 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-black text-white">$14.2M</p>
                <p className="text-xs text-slate-400 tracking-wider">Premios olvidados en 2025</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-amber-500 font-mono">100%</p>
                <p className="text-xs text-slate-400 tracking-wider">Verificación Automática</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Right: Interactive 3D ticket */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center perspective-1000 py-10 sm:py-0"
          >
            <div 
              onMouseMove={handleTicketMouseMove}
              onMouseLeave={handleTicketMouseLeave}
              className="relative w-full max-w-[360px] h-[480px] rounded-3xl glass-panel-gold border-amber-500/30 flex flex-col justify-between p-6 cursor-pointer preserve-3d transition-3d shadow-[0_20px_50px_rgba(234,179,8,0.05)] hover:shadow-[0_25px_60px_rgba(234,179,8,0.22)]"
            >
              {/* Reflective shine element inside ticket */}
              <div className="ticket-shine absolute inset-0 rounded-3xl pointer-events-none z-10 transition-opacity duration-300" 
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 70%)' }} />
              
              {/* Holographic glowing badge */}
              <div className="absolute top-4 right-4 hologram-foil w-12 h-12 rounded-full border border-white/20 flex items-center justify-center overflow-hidden z-20 shadow-inner">
                <Ticket className="h-6 w-6 text-white opacity-80" />
              </div>

              {/* Ticket Content Upper */}
              <div className="relative z-20">
                <div className="flex items-center gap-2 text-amber-500">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">BOLETA OFICIAL</span>
                </div>
                
                <h3 className="text-2xl font-black text-white mt-2 leading-none uppercase tracking-wide">
                  WHAT IF <br />
                  <span className="text-amber-400">I ACTUALLY WON?</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-2 font-mono tracking-widest">REG: #MB-2026-UDEM</p>
                
                <div className="mt-8 border-t border-b border-white/10 py-4">
                  <p className="text-[10px] text-slate-400 font-mono tracking-widest mb-1.5 uppercase">Tus números seleccionados</p>
                  <div className="flex gap-2">
                    {ticketNumbers.map((num, i) => (
                      <motion.div 
                        key={i}
                        animate={isShuffling ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 0.15 }}
                        className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-mono font-black text-white shadow-inner"
                      >
                        {num.toString().padStart(2, '0')}
                      </motion.div>
                    ))}
                    <motion.div 
                      animate={isShuffling ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.15 }}
                      className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-black text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    >
                      {luckyNumber}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Ticket Footer / Interactive action */}
              <div className="relative z-20 mt-auto">
                <div className="flex justify-between items-center bg-black/30 border border-white/5 p-3.5 rounded-xl backdrop-blur-md mb-6 shadow-inner">
                  <div>
                    <p className="text-[9px] text-amber-500/70 font-mono uppercase tracking-widest">Estado del Sorteo</p>
                    <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      Activo & Listo
                    </p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShuffleNumbers();
                    }}
                    disabled={isShuffling}
                    className="h-10 px-4 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 hover:border-amber-400 rounded-lg font-bold text-xs flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={cn("h-3.5 w-3.5", isShuffling && "animate-spin")} />
                    <span>{isShuffling ? 'Sorteando...' : 'Re-sortear'}</span>
                  </button>
                </div>

                {/* Scan Barcode laser line effect */}
                <div className="relative h-14 bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col justify-center px-4">
                  {/* Glowing vertical scanning line */}
                  <div className="scanner-line" />
                  
                  {/* Barcode lines */}
                  <div className="flex justify-between items-stretch h-8 opacity-40">
                    <div className="w-1.5 bg-white" /><div className="w-0.5 bg-white" /><div className="w-1 bg-white" />
                    <div className="w-2.5 bg-white" /><div className="w-0.5 bg-white" /><div className="w-1.5 bg-white" />
                    <div className="w-0.5 bg-white" /><div className="w-2 bg-white" /><div className="w-1.5 bg-white" />
                    <div className="w-1 bg-white" /><div className="w-2.5 bg-white" /><div className="w-0.5 bg-white" />
                  </div>
                  <p className="text-center text-[8px] font-mono text-slate-400 tracking-[0.3em] mt-1">2026-MI-BOLETA-WIN-APP</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 2: HOW IT WORKS
      ---------------------------------------------------- */}
      <section id="how-it-works" className="relative py-24 sm:py-32 px-4 z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="h-3.5 w-3.5" />
              <span>PASOS SENCILLOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              ¿Cómo aseguramos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 text-glow-gold">tu suerte?</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Diseñado con ingeniería de primer nivel para que nunca más vuelvas a perder dinero por un ticket olvidado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard 
              num="01"
              icon={Lock}
              title="Crea tu Cuenta"
              description="Regístrate gratis de forma segura. Encriptamos tu información para proteger tus boletas contra pérdidas."
            />
            <StepCard 
              num="02"
              icon={Ticket}
              title="Registra Sorteos"
              description="Introduce el número, rifa o cupón manual, o sube una foto rápida. Guardamos cada detalle por ti."
            />
            <StepCard 
              num="03"
              icon={Clock}
              title="Alertas & Escaneo"
              description="Nuestra base de datos verifica con fuentes oficiales cada sorteo al instante en que ocurren."
            />
            <StepCard 
              num="04"
              icon={Sparkles}
              title="¡Reclama tu Premio!"
              description="Te notificamos al móvil, email y SMS inmediatamente si has ganado. No más sorpresas tardías."
            />
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 3: FEATURES INTERACTIVE DASHBOARD PREVIEW
      ---------------------------------------------------- */}
      <section className="relative py-24 sm:py-32 px-4 z-20 border-t border-white/5 bg-[#04020b]/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>DASHBOARD EN ACCIÓN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Una plataforma interactiva de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-indigo-400">alta fidelidad</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Prueba nuestro simulador interactivo y descubre el poder del software diseñado para tus premios.
            </p>
          </div>

          {/* Interactive Mock Dashboard Container */}
          <div className="glass-panel rounded-3xl border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Tab Navigation header */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0a0815] border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-red-500/80" />
                <span className="h-3.5 w-3.5 rounded-full bg-yellow-500/80" />
                <span className="h-3.5 w-3.5 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-4 font-bold">SYSTEM-DASHBOARD_V1.03.exe</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => { setActiveTab('main'); }}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                    activeTab === 'main' ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25" : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                  )}
                >
                  Panel Principal
                </button>
                <button 
                  onClick={() => { setActiveTab('search'); }}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                    activeTab === 'search' ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25" : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                  )}
                >
                  Buscador Inteligente
                </button>
                <button 
                  onClick={() => { setActiveTab('alerts'); }}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                    activeTab === 'alerts' ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25" : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                  )}
                >
                  Recordatorios SMS
                </button>
                <button 
                  onClick={() => { setActiveTab('admin'); }}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                    activeTab === 'admin' ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25" : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
                  )}
                >
                  Admin Panel
                </button>
              </div>
            </div>

            {/* Dashboard Content area */}
            <div className="p-6 bg-[#07050e]/60 min-h-[350px] relative flex flex-col justify-between">
              
              {/* TAB 1: MAIN PANEL */}
              {activeTab === 'main' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#0b0818]/60 border border-white/5 p-4 rounded-xl">
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider font-bold">Total Boletas Activas</span>
                        <p className="text-3xl font-black mt-1 text-white flex items-center gap-2">
                          18 <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">+4 esta semana</span>
                        </p>
                      </div>
                      <div className="bg-[#0b0818]/60 border border-white/5 p-4 rounded-xl">
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider font-bold">Tasa de Comprobación</span>
                        <p className="text-3xl font-black mt-1 text-amber-500 font-mono">100%</p>
                      </div>
                    </div>

                    <div className="bg-[#0b0818]/60 border border-white/5 p-5 rounded-xl">
                      <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                        Histórico de Acumulados & Comprobación (Auto Check)
                      </h4>
                      {/* SVG Line Chart */}
                      <div className="h-32 w-full flex items-end">
                        <svg className="w-full h-full text-amber-500" viewBox="0 0 100 30" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M0,25 Q15,10 30,18 T60,8 T80,14 T100,5" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                          />
                          <path 
                            d="M0,25 Q15,10 30,18 T60,8 T80,14 T100,5 L100,30 L0,30 Z" 
                            fill="url(#chartGrad)" 
                          />
                        </svg>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2 uppercase">
                        <span>Mar</span><span>Abr</span><span>May (Actual)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b0818]/60 border border-white/5 p-4 rounded-xl space-y-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-2 mb-3">
                        <Ticket className="h-4 w-4 text-amber-500" />
                        Boletas Próximas
                      </h4>
                      <div className="space-y-2">
                        <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-white">Powerball USD</p>
                            <p className="text-[9px] text-slate-400 font-mono">14-27-33-45-59 [7]</p>
                          </div>
                          <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">En 2h</span>
                        </div>
                        <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-bold text-white">Sorteo Especial Lotería</p>
                            <p className="text-[9px] text-slate-400 font-mono">08-19-22-31-50 [4]</p>
                          </div>
                          <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">Mañana</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => showToast('¡Sorteos sincronizados con bases de datos!')}
                      className="w-full h-11 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 text-amber-400 hover:text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Actualizar Bases de Datos
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SMART SEARCH */}
              {activeTab === 'search' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="space-y-6"
                >
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Busca por nombre o combinaciones (ej. Powerball, 14, 59)..."
                        className="w-full h-12 bg-black/40 border border-white/10 hover:border-amber-500/30 focus:border-amber-500/70 focus:outline-none rounded-xl pl-11 pr-4 text-sm text-white placeholder-gray-500 transition-colors"
                      />
                    </div>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="px-4 h-12 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold border border-white/10"
                    >
                      Limpiar
                    </button>
                  </div>

                  <div className="bg-[#0b0818]/60 border border-white/5 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 bg-black/40 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/5">
                      <span>Sorteo / Rifa</span>
                      <span>Números de Boleta</span>
                      <span>Fecha</span>
                      <span className="text-right">Estado</span>
                    </div>

                    <div className="divide-y divide-white/5">
                      {filteredTickets.length > 0 ? (
                        filteredTickets.map((t, idx) => (
                          <div key={idx} className="grid grid-cols-4 gap-4 px-4 py-3.5 text-xs items-center hover:bg-white/5 transition-colors">
                            <span className="font-bold text-white">{t.name}</span>
                            <span className="font-mono text-amber-400 font-bold">{t.numbers}</span>
                            <span className="text-slate-300">{t.date}</span>
                            <span className="text-right">
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded",
                                t.status === 'Confirmado' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                                t.status === 'Pendiente' && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                                t.status === 'Activo' && "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                                t.status === 'Registrado' && "bg-white/5 text-slate-200 border border-white/10"
                              )}>
                                {t.status}
                              </span>
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                          <AlertCircle className="h-6 w-6 text-amber-500/50" />
                          No se encontraron boletas con la búsqueda "{searchQuery}"
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: ALERTS */}
              {activeTab === 'alerts' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-[#0b0818]/60 border border-white/5 p-5 rounded-xl flex flex-col justify-between">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Bell className="h-4.5 w-4.5 text-amber-500" />
                        Configurar Alertas Móviles
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Te notificamos instantáneamente al momento de validarse un sorteo. Activa notificaciones directas por SMS, correo electrónico o mensajería de voz sintética.
                      </p>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between p-3 bg-black/30 border border-white/5 rounded-lg">
                          <div>
                            <p className="text-xs font-bold text-white">Alertas por SMS Directo</p>
                            <p className="text-[10px] text-slate-400">Notificación al instante de ganar</p>
                          </div>
                          <button 
                            onClick={() => {
                              setSmsToggle(!smsToggle);
                              showToast(smsToggle ? 'SMS Desactivados' : 'SMS Activados');
                            }}
                            className={cn(
                              "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
                              smsToggle ? "bg-amber-500" : "bg-white/15"
                            )}
                          >
                            <div className={cn("w-4.5 h-4.5 rounded-full bg-black transition-transform", smsToggle ? "translate-x-5" : "translate-x-0")} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-black/30 border border-white/5 rounded-lg">
                          <div>
                            <p className="text-xs font-bold text-white">Inteligencia Artificial Chequeo-Automático</p>
                            <p className="text-[10px] text-slate-400">Auto consulta con OCR en la nube</p>
                          </div>
                          <button 
                            onClick={() => {
                              setAiToggle(!aiToggle);
                              showToast(aiToggle ? 'Chequeo IA Desactivado' : 'Chequeo IA Activado');
                            }}
                            className={cn(
                              "w-11 h-6 rounded-full transition-colors relative flex items-center px-1",
                              aiToggle ? "bg-amber-500" : "bg-white/15"
                            )}
                          >
                            <div className={cn("w-4.5 h-4.5 rounded-full bg-black transition-transform", aiToggle ? "translate-x-5" : "translate-x-0")} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0b0818]/60 border border-white/5 p-5 rounded-xl space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Vista Previa de Alertas</h4>
                    
                    <div className="space-y-2 font-mono">
                      <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex items-start gap-3 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                        <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0 animate-bounce" />
                        <div>
                          <p className="text-xs font-black text-amber-400">ALERT: GANADOR OFICIAL</p>
                          <p className="text-[10px] text-slate-200 mt-1">¡Felicidades Edison! Tu ticket #MB-POWER de Powerball coincide con 5 números. Premio aproximado: $10,000 USD.</p>
                          <span className="text-[8px] text-slate-400 block mt-1.5">Hace 2 minutos</span>
                        </div>
                      </div>

                      <div className="bg-indigo-500/10 border border-indigo-500/25 p-3 rounded-lg flex items-start gap-3">
                        <Clock className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-black text-indigo-400">RECORDATORIO</p>
                          <p className="text-[10px] text-slate-200 mt-1">El acumulado de Mega Millions ha alcanzado los $450 Millones de USD. Tu recordatorio expira en 4 horas.</p>
                          <span className="text-[8px] text-slate-400 block mt-1.5">Hace 1 hora</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: ADMIN PANEL */}
              {activeTab === 'admin' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-[#0b0818]/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between text-center">
                    <div>
                      <Shield className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Monitoreo de APIs</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Conexión con servidores de Lotería Nacional</p>
                    </div>
                    <div className="mt-4 bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                      ONLINE (Ping: 12ms)
                    </div>
                  </div>

                  <div className="bg-[#0b0818]/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between text-center">
                    <div>
                      <Layers className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Auditorías Automatizadas</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Búsqueda profunda de tickets ganadores</p>
                    </div>
                    <button 
                      onClick={() => showToast('Auditoría profunda iniciada para 18 boletas')}
                      className="mt-4 h-9 bg-amber-500 text-black hover:bg-amber-400 rounded-lg text-xs font-bold font-mono transition-all"
                    >
                      FORZAR AUDITORÍA
                    </button>
                  </div>

                  <div className="bg-[#0b0818]/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between text-center">
                    <div>
                      <CheckCircle2 className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">BBDD de Ganadores</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Historial general de premios localizados</p>
                    </div>
                    <div className="mt-4 bg-black/40 border border-white/5 p-2 rounded-lg text-amber-400 font-mono text-[10px] font-bold">
                      7 PREMIOS DETECTADOS
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Interactive Dashboard Footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 uppercase font-bold text-amber-500/70">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  SERVIDOR DE PRUEBA ACTIVO
                </span>
                <span className="uppercase">Latencia de Red: 14ms | Encriptación: AES-256</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 4: UPCOMING DRAWS COUNTDOWN
      ---------------------------------------------------- */}
      <section className="upcoming-draws-section relative py-24 sm:py-32 px-4 z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Countdown Left Column */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5 animate-pulse" />
                <span>PRÓXIMOS EVENTOS</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                El próximo sorteo mayor <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-600 text-glow-gold">
                  cierra muy pronto
                </span>
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                No permitas que las horas pasen sin registrar tu ticket. El reloj corre y el sistema valida de inmediato al emitirse los resultados oficiales.
              </p>

              {/* Digital Countdown Timer */}
              <div className="bg-[#05040a]/80 border border-white/5 p-6 rounded-2xl shadow-inner max-w-sm mx-auto lg:mx-0">
                <DigitalCountdown />
              </div>
            </div>

            {/* Lottery Grid Right Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <LotteryCard 
                name="Powerball USA"
                jackpot="$460 Millones"
                closeText="Cierra en 2 horas"
                color="border-amber-500/20 hover:border-amber-500/60"
                logoText="PB"
                onActivate={() => showToast('¡Alerta de Powerball Activada!')}
              />
              <LotteryCard 
                name="Mega Millions"
                jackpot="$385 Millones"
                closeText="Cierra en 1 día"
                color="border-indigo-500/25 hover:border-indigo-500/60"
                logoText="MM"
                onActivate={() => showToast('¡Alerta de Mega Millions Activada!')}
              />
              <LotteryCard 
                name="EuroMillions"
                jackpot="€120 Millones"
                closeText="Cierra en 3 días"
                color="border-amber-500/20 hover:border-amber-500/60"
                logoText="EM"
                onActivate={() => showToast('¡Alerta de EuroMillions Activada!')}
              />
              <LotteryCard 
                name="Rifa de Suerte Local"
                jackpot="$100k USD"
                closeText="Cierra en 12 horas"
                color="border-emerald-500/20 hover:border-emerald-500/60"
                logoText="SL"
                onActivate={() => showToast('¡Alerta de Rifa Local Activada!')}
              />

            </div>

          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 5: HIGH IMPACT CALL TO ACTION
      ---------------------------------------------------- */}
      <section className="relative py-28 sm:py-36 px-4 z-20 border-t border-white/5 overflow-hidden">
        
        {/* Warp background glow grid */}
        <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-indigo-600/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <Sparkles className="h-4 w-4 animate-spin duration-[6s]" />
            <span>ACCESO INSTANTÁNEO AL INSTANTE</span>
          </motion.div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none uppercase">
            ¿Y si la fortuna ya llamó <br className="hidden sm:block" />
            y <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-glow-gold">nunca abriste la puerta?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Regístrate gratis hoy mismo y pon tus tickets a salvo. Toma solo 2 minutos sincronizar tus primeros sorteos.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="w-full sm:w-auto">
              <button className="w-full relative group px-10 py-5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xl rounded-2xl transition-all duration-300 active:scale-95 shadow-[0_0_40px_rgba(245,158,11,0.35)] hover:shadow-[0_0_50px_rgba(245,158,11,0.55)] flex items-center justify-center gap-2">
                <span>Registrar Mi Primera Boleta</span>
                <ArrowRight className="h-6 w-6 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 6: CINEMATIC DARK FOOTER
      ---------------------------------------------------- */}
      <footer className="relative py-16 sm:py-24 px-4 z-20 border-t border-white/10 bg-[#020205] text-slate-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Ticket className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-white">
                  WHAT IF
                </span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-amber-500 -mt-1.5 uppercase">
                  I Actually Won?
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              El software inteligente premium que escanea y valida tus boletas de sorteo, sweepstakes y loterías a nivel mundial para que nunca más olvides reclamar lo que es tuyo.
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-max shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              TODOS LOS SISTEMAS ONLINE - 99.9% PRECISIÓN
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Solución</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/auth/register" className="hover:text-amber-500 transition-colors">Registro Seguro</Link></li>
              <li><a href="#how-it-works" className="hover:text-amber-500 transition-colors">Escaneo en la Nube</a></li>
              <li><Link href="/dashboard" className="hover:text-amber-500 transition-colors">Panel Inteligente</Link></li>
              <li><Link href="/tickets" className="hover:text-amber-500 transition-colors">Tasa de Acierto</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Seguridad</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Políticas de Privacidad</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Seguridad de Encriptación</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Cumplimiento Oficial</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Soporte y Contacto</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Soporte Técnico 24/7</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contacto Corporativo</a></li>
            </ul>
          </div>

        </div>

        {/* Footer legal notes */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} What If I Actually Won? / Mi Boleta. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-500/70 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-500/70 transition-colors">Twitter (X)</a>
            <a href="#" className="hover:text-amber-500/70 transition-colors">GitHub</a>
          </div>
        </div>

      </footer>

    </div>
  );
}

// ----------------------------------------------------
// HELPER CARD COMPONENTS (STEP & LOTTERY)
// ----------------------------------------------------

interface StepCardProps {
  num: string;
  icon: any;
  title: string;
  description: string;
}

function StepCard({ num, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="group relative glass-panel hover:glass-panel-gold border-white/5 hover:border-amber-500/35 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_35px_rgba(234,179,8,0.06)] hover:-translate-y-1">
      {/* Dynamic scansweep laser lines on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-amber-500 group-hover:bg-amber-500/10 group-hover:scale-110 transition-all duration-300">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-2xl font-black text-white/25 group-hover:text-amber-500/40 transition-colors">
            {num}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-3">{title}</h3>
        <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface LotteryCardProps {
  name: string;
  jackpot: string;
  closeText: string;
  color: string;
  logoText: string;
  onActivate: () => void;
}

function LotteryCard({ name, jackpot, closeText, color, logoText, onActivate }: LotteryCardProps) {
  return (
    <div className={cn(
      "glass-panel border p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]",
      color
    )}>
      <div className="flex items-center gap-4">
        {/* Glowing badge */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/2 bg-black/40 border border-white/10 flex items-center justify-center text-amber-400 font-mono font-black text-sm shadow-inner">
          {logoText}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{name}</h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{closeText}</p>
        </div>
      </div>

      <div className="flex sm:flex-col items-start sm:items-end justify-between w-full sm:w-auto gap-2">
        <div>
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Acumulado</span>
          <p className="text-lg font-black text-amber-400 font-mono -mt-1">{jackpot}</p>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onActivate();
          }}
          className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 hover:border-amber-400 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all active:scale-95"
        >
          Activar Alerta
        </button>
      </div>
    </div>
  );
}
