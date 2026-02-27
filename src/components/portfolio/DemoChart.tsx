'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

interface DemoChartProps {
  width?: number;
  height?: number;
  className?: string;
}

function generateInitialCandles(startPrice: number, count: number): Candle[] {
  const result: Candle[] = [];
  let price = startPrice;
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const volatility = 0.0005;
    const change = (Math.random() - 0.5) * volatility;
    
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    result.push({ open, high, low, close, time: now - (count - i) * 60000 });
    price = close;
  }

  return result;
}

export function DemoChart({ height = 300, className = '' }: DemoChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const initialCandles = useMemo(() => generateInitialCandles(1.0850, 30), []);
  const initialPrice = useMemo(() => initialCandles[initialCandles.length - 1].close, [initialCandles]);
  
  const [candles, setCandles] = useState<Candle[]>(initialCandles);
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [trend, setTrend] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prev => {
        if (prev.length === 0) return prev;

        const lastCandle = prev[prev.length - 1];
        const volatility = 0.0003;
        const change = (Math.random() - 0.5) * volatility;
        
        const open = lastCandle.close;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * volatility * 0.3;
        const low = Math.min(open, close) - Math.random() * volatility * 0.3;

        const newCandle: Candle = { open, high, low, close, time: Date.now() };

        setCurrentPrice(close);
        setTrend(close >= open ? 'up' : 'down');

        return [...prev.slice(-29), newCandle];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 20, right: 60, bottom: 30, left: 10 };
    const chartWidth = w - padding.left - padding.right;
    const chartHeight = h - padding.top - padding.bottom;

    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, w, h);

    let minPrice = Infinity;
    let maxPrice = -Infinity;
    candles.forEach(c => {
      minPrice = Math.min(minPrice, c.low);
      maxPrice = Math.max(maxPrice, c.high);
    });
    const priceRange = maxPrice - minPrice;
    const pricePadding = priceRange * 0.1;
    minPrice -= pricePadding;
    maxPrice += pricePadding;

    const priceToY = (price: number) => {
      return padding.top + chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight;
    };

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    for (let i = 0; i <= 4; i++) {
      const price = maxPrice - ((maxPrice - minPrice) / 4) * i;
      const y = padding.top + (chartHeight / 4) * i;
      ctx.fillText(price.toFixed(5), w - padding.right + 5, y + 3);
    }

    const candleWidth = Math.max(3, (chartWidth / candles.length) - 2);
    const candleSpacing = chartWidth / candles.length;

    candles.forEach((candle) => {
      const i = candles.indexOf(candle);
      const x = padding.left + candleSpacing * (i + 0.5);
      const isUp = candle.close >= candle.open;
      
      const color = isUp ? '#10b981' : '#ef4444';
      const glowColor = isUp ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, priceToY(candle.high));
      ctx.lineTo(x, priceToY(candle.low));
      ctx.stroke();

      ctx.fillStyle = glowColor;
      ctx.beginPath();
      const bodyTop = priceToY(Math.max(candle.open, candle.close));
      const bodyBottom = priceToY(Math.min(candle.open, candle.close));
      const bodyHeight = Math.max(1, bodyBottom - bodyTop);
      ctx.fillRect(x - candleWidth / 2 - 2, bodyTop - 2, candleWidth + 4, bodyHeight + 4);

      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });

    const currentY = priceToY(currentPrice);
    ctx.strokeStyle = trend === 'up' ? '#10b981' : '#ef4444';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding.left, currentY);
    ctx.lineTo(w - padding.right, currentY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = trend === 'up' ? '#10b981' : '#ef4444';
    ctx.fillRect(w - padding.right, currentY - 10, 55, 20);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(currentPrice.toFixed(5), w - padding.right + 3, currentY + 3);

  }, [candles, currentPrice, trend]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  useEffect(() => {
    const handleResize = () => drawChart();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawChart]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-black/40 rounded-xl border border-white/10 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-white/80 font-mono text-sm font-semibold">EUR/USD</span>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 rounded text-emerald-400 text-xs">
            <Activity className="w-3 h-3 animate-pulse" />
            Live Demo
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Market Analysis Demo</span>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 py-2 bg-white/5">
        <div className="flex items-center gap-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`font-mono text-lg font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {currentPrice.toFixed(5)}
          </span>
        </div>
        <div className="text-xs text-white/40">
          {trend === 'up' ? '▲' : '▼'} Simulated
        </div>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} style={{ width: '100%', height: `${height}px` }} className="block" />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border-t border-violet-500/20">
        <AlertCircle className="w-3 h-3 text-violet-400 flex-shrink-0" />
        <span className="text-xs text-violet-300/80">
          This is a simulation for demonstration purposes only. Not a trading signal.
        </span>
      </div>

      <div className="absolute top-2 right-2 flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default DemoChart;
