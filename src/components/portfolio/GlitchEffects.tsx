'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`} data-text={text}>
      <span className="glitch-text" data-text={text}>
        {text}
      </span>
    </span>
  );
}

interface GlitchImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function GlitchImage({ src, alt, className = '' }: GlitchImageProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Random glitch intervals
    const startGlitch = () => {
      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.95) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200);
        }
      }, 100);
    };

    startGlitch();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-100 ${
          isGlitching ? 'animate-glitch' : ''
        }`}
        style={{
          filter: isGlitching 
            ? `hue-rotate(${Math.random() * 360}deg) saturate(2)` 
            : 'none',
        }}
      />
      {isGlitching && (
        <>
          <div 
            className="absolute inset-0 bg-cyan-500/20 mix-blend-screen"
            style={{ 
              clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`,
              transform: `translateX(${(Math.random() - 0.5) * 20}px)`
            }}
          />
          <div 
            className="absolute inset-0 bg-red-500/20 mix-blend-screen"
            style={{ 
              clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`,
              transform: `translateX(${(Math.random() - 0.5) * -20}px)`
            }}
          />
        </>
      )}
    </div>
  );
}

// Scanlines overlay component
export function Scanlines() {
  return (
    <div className="scanlines pointer-events-none fixed inset-0 z-50" />
  );
}

// Cyberpunk border effect
export function CyberBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 rounded-lg opacity-0 group-hover:opacity-75 blur transition-all duration-500 animate-gradient-x" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// Holographic effect
export function Holographic({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setOffset({ x: x * 10, y: y * 10 });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* RGB layers */}
      <div 
        className="absolute inset-0 text-cyan-400 mix-blend-screen"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {children}
      </div>
      <div 
        className="absolute inset-0 text-red-400 mix-blend-screen"
        style={{ transform: `translate(${-offset.x}px, ${-offset.y}px)` }}
      >
        {children}
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// Glitch button effect
export function GlitchButton({ 
  children, 
  onClick,
  className = '' 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative px-6 py-3 bg-black border border-emerald-500/50 text-emerald-400 font-mono uppercase tracking-wider overflow-hidden group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glitch layers */}
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 bg-emerald-500/10"
            animate={{
              x: [0, -2, 2, 0],
              y: [0, 1, -1, 0],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
          <motion.span
            className="absolute inset-0 border border-cyan-400"
            animate={{
              x: [0, 2, -2, 0],
            }}
            transition={{ duration: 0.15, repeat: Infinity }}
          />
        </>
      )}
      
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100" />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Neon glow text
export function NeonText({ 
  text, 
  color = 'emerald',
  className = '' 
}: { 
  text: string;
  color?: 'emerald' | 'cyan' | 'violet' | 'red';
  className?: string;
}) {
  const colorMap = {
    emerald: 'text-emerald-400 shadow-[0_0_10px_#10b981,0_0_20px_#10b981,0_0_40px_#10b981]',
    cyan: 'text-cyan-400 shadow-[0_0_10px_#22d3ee,0_0_20px_#22d3ee,0_0_40px_#22d3ee]',
    violet: 'text-violet-400 shadow-[0_0_10px_#a78bfa,0_0_20px_#a78bfa,0_0_40px_#a78bfa]',
    red: 'text-red-400 shadow-[0_0_10px_#f87171,0_0_20px_#f87171,0_0_40px_#f87171]',
  };

  return (
    <span className={`font-bold ${colorMap[color]} ${className}`}>
      {text}
    </span>
  );
}

export default GlitchText;
