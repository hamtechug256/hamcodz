'use client';

import { createContext, useContext, useRef, useState, useCallback, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
  playTyping: () => void;
  playSuccess: () => void;
  playError: () => void;
  isEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    return { playHover: () => {}, playClick: () => {}, playTyping: () => {}, playSuccess: () => {}, playError: () => {}, isEnabled: false, toggleSound: () => {} };
  }
  return context;
}

export function SoundEffects({ children }: { children?: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('soundEnabled') === 'true';
  });
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  useEffect(() => { localStorage.setItem('soundEnabled', String(isEnabled)); }, [isEnabled]);

  const createOscillator = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', gain: number = 0.1) => {
    if (!isEnabled) return;
    try {
      const ctx = initAudioContext();
      if (ctx.state === 'suspended') ctx.resume();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(gain, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) { console.warn('Sound playback failed:', e); }
  }, [isEnabled, initAudioContext]);

  const playHover = useCallback(() => { createOscillator(880, 0.05, 'sine', 0.03); createOscillator(1760, 0.03, 'sine', 0.02); }, [createOscillator]);
  const playClick = useCallback(() => { createOscillator(1200, 0.08, 'square', 0.05); createOscillator(600, 0.1, 'sawtooth', 0.03); }, [createOscillator]);
  const playTyping = useCallback(() => { const freq = 400 + Math.random() * 200; createOscillator(freq, 0.03, 'square', 0.02); }, [createOscillator]);
  const playSuccess = useCallback(() => { createOscillator(523, 0.15, 'sine', 0.08); setTimeout(() => createOscillator(659, 0.15, 'sine', 0.08), 80); setTimeout(() => createOscillator(784, 0.2, 'sine', 0.1), 160); }, [createOscillator]);
  const playError = useCallback(() => { createOscillator(400, 0.15, 'sawtooth', 0.06); setTimeout(() => createOscillator(300, 0.2, 'sawtooth', 0.08), 100); }, [createOscillator]);
  const toggleSound = useCallback(() => setIsEnabled(prev => !prev), []);

  return (
    <SoundContext.Provider value={{ playHover, playClick, playTyping, playSuccess, playError, isEnabled, toggleSound }}>
      {children}
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => { toggleSound(); if (!isEnabled) { setTimeout(() => { createOscillator(523, 0.15, 'sine', 0.08); setTimeout(() => createOscillator(784, 0.2, 'sine', 0.1), 100); }, 50); } }}
        className="fixed bottom-44 right-6 z-50 w-12 h-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center group hover:border-emerald-500/60 transition-all shadow-lg backdrop-blur-sm"
        title={isEnabled ? 'Disable Sound' : 'Enable Sound'}
      >
        <AnimatePresence mode="wait">
          {isEnabled ? (
            <motion.div key="on" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.2 }}>
              <Volume2 className="w-5 h-5 text-emerald-400" />
            </motion.div>
          ) : (
            <motion.div key="off" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -180 }} transition={{ duration: 0.2 }}>
              <VolumeX className="w-5 h-5 text-white/40" />
            </motion.div>
          )}
        </AnimatePresence>
        {isEnabled && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div className="w-full h-full rounded-xl border border-emerald-500/50" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        )}
        <div className="absolute -top-8 right-0 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{isEnabled ? 'Sound ON' : 'Sound OFF'}</div>
      </motion.button>
    </SoundContext.Provider>
  );
}

export function useSoundOnHover() { const { playHover } = useSound(); return { onMouseEnter: playHover }; }
export function useSoundOnClick() { const { playClick } = useSound(); return { onClick: playClick }; }
export default SoundEffects;
