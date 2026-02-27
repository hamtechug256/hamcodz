'use client';

import { useEffect, useState, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Terminal, Volume2, Home } from 'lucide-react';

interface KeyboardNavContextType {
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  matrixEnabled: boolean;
  setMatrixEnabled: (enabled: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

const KeyboardNavContext = createContext<KeyboardNavContextType | null>(null);

export function useKeyboardNav() {
  const context = useContext(KeyboardNavContext);
  if (!context) {
    return { terminalOpen: false, setTerminalOpen: () => {}, matrixEnabled: true, setMatrixEnabled: () => {}, soundEnabled: false, setSoundEnabled: () => {}, currentSection: 0, setCurrentSection: () => {} };
  }
  return context;
}

const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

function ShortcutKey({ children, keys }: { children: React.ReactNode; keys: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <span className="text-white/70 text-sm">{children}</span>
      <div className="flex gap-1">
        {keys.split('+').map((key, i) => (
          <kbd key={i} className="px-2 py-1 text-xs font-mono bg-black/50 border border-white/20 rounded text-emerald-400">{key}</kbd>
        ))}
      </div>
    </div>
  );
}

export function KeyboardNav() {
  const [showHelp, setShowHelp] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; text: string; icon?: React.ReactNode }[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const showToast = useCallback((text: string, icon?: React.ReactNode) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2000);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const element = document.getElementById(sections[index]);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(index);
      showToast(`Navigated to ${sections[index].charAt(0).toUpperCase() + sections[index].slice(1)}`);
    }
  }, [showToast]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case 'j': case 'arrowdown': if (currentSection < sections.length - 1) scrollToSection(currentSection + 1); break;
        case 'k': case 'arrowup': if (currentSection > 0) scrollToSection(currentSection - 1); break;
        case 't': setTerminalOpen(prev => !prev); showToast(terminalOpen ? 'Terminal Closed' : 'Terminal Opened', <Terminal className="w-4 h-4" />); break;
        case 'm': setMatrixEnabled(prev => !prev); showToast(matrixEnabled ? 'Matrix Rain Disabled' : 'Matrix Rain Enabled'); break;
        case 's': setSoundEnabled(prev => !prev); showToast(soundEnabled ? 'Sound Disabled' : 'Sound Enabled', <Volume2 className="w-4 h-4" />); break;
        case 'h': window.scrollTo({ top: 0, behavior: 'smooth' }); setCurrentSection(0); showToast('Going Home', <Home className="w-4 h-4" />); break;
        case '?': setShowHelp(prev => !prev); break;
        case 'escape': setShowHelp(false); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, terminalOpen, matrixEnabled, soundEnabled, scrollToSection, showToast]);

  return (
    <KeyboardNavContext.Provider value={{ terminalOpen, setTerminalOpen, matrixEnabled, setMatrixEnabled, soundEnabled, setSoundEnabled, currentSection, setCurrentSection }}>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowHelp(true)} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-black/80 border border-white/10 flex items-center justify-center group hover:border-cyan-500/60 transition-all shadow-lg backdrop-blur-sm" title="Keyboard Shortcuts">
        <Keyboard className="w-5 h-5 text-cyan-400" />
        <div className="absolute -top-8 right-0 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Shortcuts (?)</div>
      </motion.button>

      <AnimatePresence>
        {showHelp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowHelp(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-black/90 border border-emerald-500/30 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2"><Keyboard className="w-5 h-5 text-emerald-400" /><h2 className="text-lg font-bold text-white">Keyboard Shortcuts</h2></div>
                <button onClick={() => setShowHelp(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5 text-white/60" /></button>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Navigation</div>
                <ShortcutKey keys="J">Next Section</ShortcutKey>
                <ShortcutKey keys="K">Previous Section</ShortcutKey>
                <ShortcutKey keys="H">Go to Home</ShortcutKey>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2 mt-4">Features</div>
                <ShortcutKey keys="T">Toggle Terminal</ShortcutKey>
                <ShortcutKey keys="M">Toggle Matrix Rain</ShortcutKey>
                <ShortcutKey keys="S">Toggle Sound</ShortcutKey>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2 mt-4">Help</div>
                <ShortcutKey keys="?">Show this help</ShortcutKey>
                <ShortcutKey keys="Esc">Close modal</ShortcutKey>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-white/40 text-xs">Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-black/50 border border-white/20 rounded text-emerald-400">?</kbd> anytime to toggle this help</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast, index) => (
            <motion.div key={toast.id} initial={{ opacity: 0, x: 100, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 100, scale: 0.9 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="flex items-center gap-2 px-4 py-2 bg-black/90 border border-emerald-500/30 rounded-lg shadow-lg backdrop-blur-sm" style={{ marginBottom: index * 4 }}>
              {toast.icon && <span className="text-emerald-400">{toast.icon}</span>}
              <span className="text-sm text-white/80 font-mono">{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
        {sections.map((section, index) => (
          <button key={section} onClick={() => scrollToSection(index)} className={`w-2 h-8 rounded-full transition-all ${currentSection === index ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-white/20 hover:bg-white/40'}`} title={section.charAt(0).toUpperCase() + section.slice(1)} />
        ))}
      </div>
    </KeyboardNavContext.Provider>
  );
}

export default KeyboardNav;
