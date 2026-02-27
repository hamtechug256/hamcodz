'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MatrixRainProps {
  opacity?: number;
  speed?: number;
  charSize?: number;
  color?: string;
}

export function MatrixRain({ 
  opacity = 0.03, 
  speed = 50, 
  charSize = 14,
  color = '#10b981' // emerald-500
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((ctx: CanvasRenderingContext2D, columns: number, drops: number[], charSize: number, width: number) => {
    // Semi-transparent black to create fade effect
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, width, window.innerHeight);

    // Green text
    ctx.fillStyle = color;
    ctx.font = `${charSize}px monospace`;

    for (let i = 0; i < columns; i++) {
      // Random character (Japanese katakana + numbers + symbols)
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF@#$%^&*()';
      const char = chars[Math.floor(Math.random() * chars.length)];
      
      const x = i * charSize;
      const y = drops[i] * charSize;

      // Varying opacity for depth effect
      const alpha = Math.random() * 0.5 + 0.5;
      ctx.fillStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      
      ctx.fillText(char, x, y);

      // Reset drop to top randomly after it goes off screen
      if (y > window.innerHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      columns = Math.floor(canvas.width / charSize);
      drops = Array(columns).fill(1);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (ctx && drops) {
        draw(ctx, columns, drops, charSize, canvas.width);
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [charSize, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}

// Alternative CSS-based Matrix Rain for better performance
export function MatrixRainCSS({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity }}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-emerald-500 text-xs font-mono whitespace-pre animate-matrix-fall"
          style={{
            left: `${(i * 3.5)}%`,
            animationDuration: `${3 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j} style={{ opacity: Math.random() * 0.7 + 0.3 }}>
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatrixRain;
