'use client';

import { useEffect, useCallback, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ParticleTrailProps {
  color?: string;
  particleCount?: number;
  trailLength?: number;
  enabled?: boolean;
}

export function ParticleTrail({ 
  color = '#10b981',
  particleCount = 3,
  trailLength = 20,
  enabled = true
}: ParticleTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = [
      '#10b981', // emerald
      '#22d3ee', // cyan
      '#a78bfa', // violet
      '#f59e0b', // amber
    ];
    
    return {
      x,
      y,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      life: 0,
      maxLife: Math.random() * 30 + 20,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, isMoving: true };
      
      // Calculate speed
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      // Only create particles when moving fast enough
      if (speed > 5) {
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(createParticle(e.clientX, e.clientY));
        }
      }
      
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Clear the moving flag after a delay
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life++;
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedX *= 0.98;
        particle.speedY *= 0.98;

        const progress = particle.life / particle.maxLife;
        const opacity = 1 - progress;
        const size = particle.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Add glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(opacity * 50).toString(16).padStart(2, '0');
        ctx.fill();

        return particle.life < particle.maxLife;
      });

      // Limit particle count
      if (particlesRef.current.length > trailLength * particleCount) {
        particlesRef.current = particlesRef.current.slice(-trailLength * particleCount);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [color, particleCount, trailLength, enabled, createParticle]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

// Sparkle effect on click
export function SparkleEffect({ enabled = true }: { enabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sparkles: { x: number; y: number; size: number; life: number; color: string }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleClick = (e: MouseEvent) => {
      const colors = ['#10b981', '#22d3ee', '#f59e0b', '#a78bfa', '#f87171'];
      
      for (let i = 0; i < 20; i++) {
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 2,
          life: 0,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    window.addEventListener('click', handleClick);

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles = sparkles.filter((sparkle) => {
        sparkle.life++;
        
        const progress = sparkle.life / 30;
        const opacity = 1 - progress;
        const size = sparkle.size * (1 + progress);
        
        // Random spread
        const spread = progress * 50;
        const angle = Math.random() * Math.PI * 2;
        const x = sparkle.x + Math.cos(angle) * spread;
        const y = sparkle.y + Math.sin(angle) * spread;

        // Draw star
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(progress * Math.PI);
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const starAngle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const starSize = size * (i % 2 === 0 ? 1 : 0.5);
          if (i === 0) {
            ctx.moveTo(Math.cos(starAngle) * starSize, Math.sin(starAngle) * starSize);
          } else {
            ctx.lineTo(Math.cos(starAngle) * starSize, Math.sin(starAngle) * starSize);
          }
        }
        ctx.closePath();
        ctx.fillStyle = sparkle.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        ctx.restore();

        return sparkle.life < 30;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}

export default ParticleTrail;
