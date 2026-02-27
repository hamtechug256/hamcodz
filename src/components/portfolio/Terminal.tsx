'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  X, 
  Minus, 
  Square, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  Github, 
  Twitter, 
  Send,
  Shield,
  TrendingUp,
  Cpu,
  Lock,
  Sparkles,
  HelpCircle,
  Clear,
  ExternalLink
} from 'lucide-react';

interface CommandResult {
  type: 'output' | 'error' | 'success' | 'info';
  content: React.ReactNode;
}

interface HistoryItem {
  command: string;
  result: CommandResult[];
}

const commands: Record<string, { 
  description: string; 
  usage?: string;
  aliases?: string[];
}> = {
  help: { description: 'Show available commands', aliases: ['h', '?'] },
  whoami: { description: 'About me', aliases: ['about', 'me'] },
  skills: { description: 'List my skills', aliases: ['skill', 'tech'] },
  projects: { description: 'View my projects', aliases: ['project', 'work'] },
  contact: { description: 'Get my contact info', aliases: ['email', 'connect'] },
  social: { description: 'My social links', aliases: ['links', 'socials'] },
  clear: { description: 'Clear terminal', aliases: ['cls', 'reset'] },
  neofetch: { description: 'System info (styled)', aliases: ['info', 'sys'] },
  secret: { description: '???', aliases: ['hidden', 'easteregg'] },
  matrix: { description: 'Enter the matrix', aliases: ['hack'] },
  coffee: { description: 'Buy me a coffee', aliases: ['support', 'donate'] },
  quote: { description: 'Random trading quote', aliases: ['wisdom'] },
  joke: { description: 'Tell me a developer joke', aliases: ['funny', 'laugh'] },
};

const quotes = [
  "The goal of a successful trader is to make the best trades. Money is secondary. - Alexander Elder",
  "The key to trading success is emotional discipline. - Victor Sperandeo",
  "Risk comes from not knowing what you're doing. - Warren Buffett",
  "The markets can remain irrational longer than you can remain solvent. - John Maynard Keynes",
  "In trading, the impossible happens about twice a year. - Henrik J. Rützou",
];

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
  "Why did the developer go broke? Because he used up all his cache! 💰",
  "A hacker's favorite snack? Chips and dip! 🌮",
  "!false - It's funny because it's true.",
];

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixMode, setMatrixMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const processCommand = useCallback((cmd: string): CommandResult[] => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const mainCmd = args[0];

    // Check for aliases
    let matchedCommand = mainCmd;
    for (const [key, value] of Object.entries(commands)) {
      if (value.aliases?.includes(mainCmd)) {
        matchedCommand = key;
        break;
      }
    }

    switch (matchedCommand) {
      case 'help':
        return [{
          type: 'info',
          content: (
            <div className="space-y-1">
              <div className="text-emerald-400 mb-2">Available Commands:</div>
              {Object.entries(commands).map(([cmd, info]) => (
                <div key={cmd} className="flex gap-4 text-sm">
                  <span className="text-cyan-400 w-24">{cmd}</span>
                  <span className="text-white/60">{info.description}</span>
                </div>
              ))}
            </div>
          )
        }];

      case 'whoami':
        return [{
          type: 'success',
          content: (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">HAMCODZ</span>
              </div>
              <div className="text-white/70 text-sm">
                Multi-disciplinary technologist from Kampala, Uganda 🇺🇬
              </div>
              <div className="text-white/50 text-xs">
                Roles: Full-Stack Developer | Cybersecurity Expert | Forex Trader | EA Developer | Ethical Hacker
              </div>
            </div>
          )
        }];

      case 'skills':
        const skillCategories = [
          { 
            icon: Code, 
            label: 'Development', 
            skills: ['Next.js', 'React', 'TypeScript', 'Python', 'MQL5'],
            color: 'text-cyan-400'
          },
          { 
            icon: Shield, 
            label: 'Security', 
            skills: ['Penetration Testing', 'OWASP', 'Network Security', 'CTF'],
            color: 'text-red-400'
          },
          { 
            icon: TrendingUp, 
            label: 'Trading', 
            skills: ['ICT Concepts', 'Price Action', 'Risk Management', 'Backtesting'],
            color: 'text-emerald-400'
          },
          { 
            icon: Cpu, 
            label: 'EA Development', 
            skills: ['MetaTrader 4/5', 'Algorithmic Trading', 'Strategy Automation'],
            color: 'text-violet-400'
          },
        ];
        return [{
          type: 'success',
          content: (
            <div className="space-y-3">
              <div className="text-emerald-400">Skills & Expertise:</div>
              {skillCategories.map((cat) => (
                <div key={cat.label} className="ml-2">
                  <div className={`flex items-center gap-2 ${cat.color}`}>
                    <cat.icon className="w-3 h-3" />
                    <span className="font-semibold">{cat.label}</span>
                  </div>
                  <div className="text-white/50 text-xs ml-5">
                    {cat.skills.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          )
        }];

      case 'projects':
        return [{
          type: 'success',
          content: (
            <div className="space-y-2">
              <div className="text-emerald-400">Featured Projects:</div>
              {[
                { name: 'EURUSD Monday Range Strategy', cat: 'Trading' },
                { name: 'Hamcodz EA Framework', cat: 'EA Development' },
                { name: 'Security Audit Toolkit', cat: 'Cybersecurity' },
                { name: 'Trading Backtesting Engine', cat: 'Development' },
                { name: 'Network Intrusion Detector', cat: 'Ethical Hacking' },
                { name: 'Hamcodz Analytics Dashboard', cat: 'Full-Stack' },
              ].map((p, i) => (
                <div key={i} className="text-sm flex items-center gap-2">
                  <span className="text-cyan-400">[{i + 1}]</span>
                  <span className="text-white/80">{p.name}</span>
                  <span className="text-white/30">({p.cat})</span>
                </div>
              ))}
              <div className="text-white/40 text-xs mt-2">
                Type 'social' and check GitHub for source code
              </div>
            </div>
          )
        }];

      case 'contact':
        return [{
          type: 'success',
          content: (
            <div className="space-y-2">
              <div className="text-emerald-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Information:
              </div>
              <div className="text-sm space-y-1 ml-6">
                <div className="text-white/70">
                  Email: <span className="text-cyan-400">hamzaholix@gmail.com</span>
                </div>
                <div className="text-white/70">
                  WhatsApp: <span className="text-cyan-400">+256 742 337 382</span>
                </div>
                <div className="text-white/70">
                  Location: <span className="text-cyan-400">Kampala, Uganda 🇺🇬</span>
                </div>
              </div>
            </div>
          )
        }];

      case 'social':
        return [{
          type: 'success',
          content: (
            <div className="space-y-2">
              <div className="text-emerald-400">Social Links:</div>
              <div className="text-sm space-y-1">
                <a href="https://github.com/hamtechug256" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Github className="w-3 h-3" /> github.com/hamtechug256
                </a>
                <a href="https://x.com/hamcodz" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Twitter className="w-3 h-3" /> x.com/hamcodz
                </a>
                <a href="https://t.me/Hamcodz" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Send className="w-3 h-3" /> t.me/Hamcodz
                </a>
              </div>
            </div>
          )
        }];

      case 'neofetch':
        return [{
          type: 'success',
          content: (
            <div className="flex gap-4 text-xs font-mono">
              <pre className="text-emerald-400">
{`    ██████╗  █████╗ ███╗   ███╗
    ██╔══██╗██╔══██╗████╗ ████║
    ██████╔╝███████║██╔████╔██║
    ██╔══██╗██╔══██║██║╚██╔╝██║
    ██║  ██║██║  ██║██║ ╚═╝ ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝`}
              </pre>
              <div className="space-y-1 text-white/70">
                <div><span className="text-cyan-400">user</span>@<span className="text-emerald-400">hamcodz</span></div>
                <div>-----------</div>
                <div><span className="text-cyan-400">OS:</span> Ubuntu 24.04 LTS</div>
                <div><span className="text-cyan-400">Host:</span> Vercel Edge</div>
                <div><span className="text-cyan-400">Kernel:</span> Next.js 15</div>
                <div><span className="text-cyan-400">Uptime:</span> Since 2024</div>
                <div><span className="text-cyan-400">Shell:</span> zsh 5.9</div>
                <div><span className="text-cyan-400">Terminal:</span> kitty</div>
                <div><span className="text-cyan-400">CPU:</span> Intel i9-13900K</div>
                <div><span className="text-cyan-400">Memory:</span> 64GB DDR5</div>
                <div><span className="text-cyan-400">Resolution:</span> 4K</div>
                <div className="pt-2 flex gap-1">
                  {['🟢', '🟢', '🟢', '🟢', '🟢', '🟢', '🟢'].map((c, i) => (
                    <span key={i}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        }];

      case 'secret':
        return [
          { type: 'info', content: <div className="text-violet-400 animate-pulse">🎮 Easter Egg Found!</div> },
          { type: 'success', content: <div className="text-white/70">You found the secret command!</div> },
          { type: 'success', content: <div className="text-yellow-400">Achievement Unlocked: Hacker Mindset 🏆</div> },
        ];

      case 'matrix':
        setMatrixMode(true);
        setTimeout(() => setMatrixMode(false), 3000);
        return [{
          type: 'success',
          content: (
            <div className="text-green-500 font-mono">
              <div className="animate-pulse">Wake up, Neo...</div>
              <div className="text-green-400">The Matrix has you...</div>
              <div className="text-xs text-green-600 mt-1">Follow the white rabbit. 🐇</div>
            </div>
          )
        }];

      case 'coffee':
        return [{
          type: 'info',
          content: (
            <div className="space-y-2">
              <div className="text-yellow-400">☕ Support My Work</div>
              <div className="text-white/60 text-sm">
                Found my work useful? Consider supporting!
              </div>
              <div className="text-white/70 text-sm">
                Crypto (USDT TRC20): <span className="text-cyan-400">Coming Soon</span>
              </div>
              <div className="text-2xl animate-bounce mt-2">☕</div>
            </div>
          )
        }];

      case 'quote':
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return [{
          type: 'success',
          content: (
            <div className="italic text-white/70 border-l-2 border-emerald-400 pl-3">
              "{randomQuote}"
            </div>
          )
        }];

      case 'joke':
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return [{
          type: 'success',
          content: (
            <div className="text-white/80">
              😄 {randomJoke}
            </div>
          )
        }];

      case 'clear':
        return [];

      default:
        return [{
          type: 'error',
          content: (
            <div>
              <span className="text-red-400">Command not found: </span>
              <span className="text-white/70">{mainCmd}</span>
              <div className="text-white/40 text-xs mt-1">
                Type <span className="text-emerald-400">'help'</span> for available commands
              </div>
            </div>
          )
        }];
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const results = processCommand(input);
    
    if (input.trim().toLowerCase() === 'clear' || input.trim().toLowerCase() === 'cls') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { command: input, result: results }]);
    }
    
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Terminal button always visible
  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-xl bg-black/80 border border-emerald-500/30 flex items-center justify-center group hover:border-emerald-500/60 transition-all shadow-lg shadow-emerald-500/20"
        title="Open Terminal"
      >
        <TerminalIcon className="w-6 h-6 text-emerald-400 group-hover:animate-pulse" />
        <div className="absolute -top-8 right-0 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Open Terminal
        </div>
      </motion.button>
    );
  }

  return (
    <>
      {/* Matrix Mode Overlay */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-500 text-xs font-mono"
                style={{
                  left: `${(i * 2)}%`,
                  top: `-${100 + Math.random() * 200}%`,
                }}
                animate={{
                  y: ['0vh', '120vh'],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 2,
                }}
              >
                {Array.from({ length: 20 }).map((_, j) => (
                  <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: isMinimized ? 0 : 1, 
          y: isMinimized ? 100 : 0,
          scale: isMinimized ? 0.9 : 1 
        }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className={`fixed z-50 ${isMinimized ? 'pointer-events-none' : ''}`}
        style={{
          bottom: '100px',
          right: '24px',
          width: 'min(90vw, 600px)',
          maxHeight: '70vh',
        }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/95 backdrop-blur-xl">
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-black/50 border-b border-white/5">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-white/60 font-mono">hamcodz@portfolio ~ zsh</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Minus className="w-3 h-3 text-yellow-400" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-500/20 transition-colors"
              >
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="p-4 h-80 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            {/* Welcome Message */}
            {history.length === 0 && (
              <div className="text-white/50 mb-4">
                <div className="text-emerald-400 mb-1">Welcome to Hamcodz Terminal v1.0</div>
                <div className="text-xs">Type <span className="text-cyan-400">'help'</span> to see available commands</div>
                <div className="text-xs text-white/30 mt-1">Press ↑↓ for command history</div>
              </div>
            )}

            {/* History */}
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-cyan-400">❯</span>
                  <span>{item.command}</span>
                </div>
                <div className="ml-4 mt-1">
                  {item.result.map((res, i) => (
                    <div 
                      key={i} 
                      className={`${
                        res.type === 'error' ? 'text-red-400' : 
                        res.type === 'success' ? 'text-white/80' : 
                        res.type === 'info' ? 'text-cyan-400' : 
                        'text-white/60'
                      }`}
                    >
                      {res.content}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-cyan-400">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white/90 caret-emerald-400"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </motion.div>

      {/* Minimized Button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-24 right-6 z-50 px-4 py-2 rounded-lg bg-black/80 border border-emerald-500/30 flex items-center gap-2 hover:border-emerald-500/60 transition-all"
          >
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/60">Terminal (1)</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
