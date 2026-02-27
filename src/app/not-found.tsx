'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Home, Bug, Trophy, RefreshCw } from 'lucide-react';
import { GlitchButton } from '@/components/portfolio/GlitchEffects';

interface Bug {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
}

export default function NotFound() {
  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981';
      ctx.font = '16px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(char, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const spawnBug = useCallback(() => {
    const newBug: Bug = {
      id: Date.now() + Math.random(),
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 100 : 400) + 50,
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 200 : 300) + 100,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      size: 24 + Math.random() * 16,
      rotation: Math.random() * 360,
    };
    setBugs(prev => [...prev.slice(-9), newBug]);
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(spawnBug, 1500);
    spawnBug();
    return () => clearInterval(interval);
  }, [gameActive, spawnBug]);

  useEffect(() => {
    if (!gameActive || bugs.length === 0) return;

    const interval = setInterval(() => {
      setBugs(prev => prev.map(bug => {
        let newX = bug.x + bug.vx;
        let newY = bug.y + bug.vy;
        let newVx = bug.vx;
        let newVy = bug.vy;

        if (newX <= 0 || newX >= (typeof window !== 'undefined' ? window.innerWidth : 800) - 50) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(newX, (typeof window !== 'undefined' ? window.innerWidth : 800) - 50));
        }
        if (newY <= 50 || newY >= (typeof window !== 'undefined' ? window.innerHeight : 600) - 100) {
          newVy = -newVy;
          newY = Math.max(50, Math.min(newY, (typeof window !== 'undefined' ? window.innerHeight : 600) - 100));
        }

        return { ...bug, x: newX, y: newY, vx: newVx, vy: newVy, rotation: bug.rotation + 2 };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [gameActive, bugs.length]);

  const catchBug = (bugId: number) => {
    setBugs(prev => prev.filter(b => b.id !== bugId));
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= 10) setShowSecret(true);
      return newScore;
    });
  };

  const resetGame = () => {
    setScore(0);
    setBugs([]);
    setShowSecret(false);
    setGameActive(true);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.3 }} />
      <div className="scanlines pointer-events-none fixed inset-0 z-10" />

      <div className="fixed inset-0 z-5 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-cyan-500/30"
            style={{ top: `${(i + 1) * 20}%` }}
            animate={{ opacity: [0, 1, 0], x: [-10, 10, -10] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.3, repeatDelay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative mb-8">
          <motion.h1
            className="text-[12rem] md:text-[16rem] font-bold font-mono leading-none select-none"
            animate={{
              textShadow: [
                '0 0 20px #10b981, 0 0 40px #10b981',
                '-2px 0 #ff00ff, 2px 0 #00ffff',
                '2px 0 #ff00ff, -2px 0 #00ffff',
                '0 0 20px #10b981, 0 0 40px #10b981',
              ],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
          >
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">404</span>
              <span className="absolute inset-0 text-cyan-400 opacity-70 animate-glitch-1" aria-hidden="true">404</span>
              <span className="absolute inset-0 text-violet-400 opacity-70 animate-glitch-2" aria-hidden="true">404</span>
            </span>
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-8">
          <p className="text-xl md:text-2xl text-white/60 font-mono mb-2">
            <span className="text-emerald-400">&gt;</span> SYSTEM_ERROR: Page not found
          </p>
          <p className="text-white/40 text-sm">The page you&apos;re looking for has been deleted... or never existed.</p>
        </motion.div>

        <AnimatePresence>
          {showSecret && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="mb-8 p-6 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-xl border border-violet-500/50 text-center"
            >
              <p className="text-violet-400 font-bold text-lg mb-2">🎮 SECRET UNLOCKED!</p>
              <p className="text-white/70 text-sm">You&apos;re a true bug hunter! Achievement: Bug Exterminator 🏆</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-8 text-center">
          {!gameActive ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameActive(true)}
              className="px-6 py-3 bg-violet-500/20 border border-violet-500/50 rounded-xl text-violet-400 font-mono hover:bg-violet-500/30 transition-all"
            >
              <Bug className="w-5 h-5 inline-block mr-2" />
              Play: Catch the Bug!
            </motion.button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/60 font-mono">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Score: <span className="text-emerald-400 text-xl">{score}</span>
              </div>
              <button onClick={resetGame} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <RefreshCw className="w-4 h-4 text-white/60" />
              </button>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {bugs.map(bug => (
            <motion.button
              key={bug.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => catchBug(bug.id)}
              className="absolute cursor-pointer z-30 hover:scale-125 transition-transform"
              style={{ left: bug.x, top: bug.y }}
            >
              <motion.div animate={{ rotate: bug.rotation }} transition={{ duration: 0.1 }}>
                <Bug className="text-emerald-400 drop-shadow-[0_0_10px_#10b981]" style={{ width: bug.size, height: bug.size }} />
              </motion.div>
            </motion.button>
          ))}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Link href="/">
            <GlitchButton>
              <Home className="w-4 h-4 mr-2 inline-block" />
              Return Home
            </GlitchButton>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 text-white/30 text-xs font-mono">
          <span className="text-emerald-400/50">&gt;</span> Error Code: 0x404_PAGE_NOT_FOUND
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, 0); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 0); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(65% 0 12% 0); transform: translate(2px, 0); }
          20% { clip-path: inset(10% 0 85% 0); transform: translate(-2px, 0); }
          40% { clip-path: inset(78% 0 5% 0); transform: translate(2px, 0); }
          60% { clip-path: inset(30% 0 62% 0); transform: translate(-2px, 0); }
          80% { clip-path: inset(5% 0 89% 0); transform: translate(2px, 0); }
        }
        .animate-glitch-1 { animation: glitch-1 3s infinite linear alternate-reverse; }
        .animate-glitch-2 { animation: glitch-2 2s infinite linear alternate-reverse; }
      `}</style>
    </div>
  );
}
