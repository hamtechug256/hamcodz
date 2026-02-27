'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Minus, Send, Sparkles, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const stored = localStorage.getItem('chatMessages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (e) {
        console.warn('Failed to parse stored messages');
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages.slice(-50)));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: userMessage.content },
          ],
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Connection error. Please try again later.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: 'Who is Hamcodz?', prompt: 'Tell me about Hamcodz and what he does.' },
    { label: 'Skills', prompt: "What are Hamcodz's main skills and expertise?" },
    { label: 'Contact', prompt: 'How can I contact Hamcodz?' },
    { label: 'Services', prompt: 'What services does Hamcodz offer?' },
  ];

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 w-14 h-14 rounded-xl bg-black/80 border border-violet-500/30 flex items-center justify-center group hover:border-violet-500/60 transition-all shadow-lg shadow-violet-500/20"
        title="AI Assistant"
      >
        <Bot className="w-6 h-6 text-violet-400 group-hover:animate-pulse" />
        <div className="absolute -top-8 left-0 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </div>
        <div className="absolute inset-0 rounded-xl border border-violet-500/30 animate-ping" />
      </motion.button>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: isMinimized ? 0 : 1, y: isMinimized ? 100 : 0, scale: isMinimized ? 0.9 : 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className={`fixed z-50 ${isMinimized ? 'pointer-events-none' : ''}`}
        style={{ bottom: '100px', left: '24px', width: 'min(90vw, 400px)', maxHeight: '70vh' }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl border border-violet-500/20 bg-black/95 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-2 bg-black/50 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-violet-400" />
              <span className="text-xs text-white/60 font-mono">HAMCODZ AI</span>
              <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsMinimized(!isMinimized)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
                <Minus className="w-3 h-3 text-yellow-400" />
              </button>
              <button onClick={() => setIsOpen(false)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-500/20 transition-colors">
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-violet-400" />
                </div>
                <p className="text-white/60 text-sm mb-4">
                  Greetings, netrunner! I&apos;m Hamcodz&apos;s AI assistant.
                  <br />How can I help you today?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => { setInput(action.prompt); inputRef.current?.focus(); }}
                      className="px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 hover:border-violet-500/30 transition-all"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-violet-400" />
                  </div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${message.role === 'user' ? 'bg-violet-500/20 text-violet-100' : 'bg-white/5 text-white/80'}`}>
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-emerald-400" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-violet-400" />
                </div>
                <div className="bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Loader2 className="w-3 h-3 text-violet-400 animate-spin" />
                    <span className="text-xs text-white/40">Processing...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/5">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-3 py-2 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-400 hover:bg-violet-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-24 left-6 z-50 px-4 py-2 rounded-lg bg-black/80 border border-violet-500/30 flex items-center gap-2 hover:border-violet-500/60 transition-all"
          >
            <Bot className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-white/60">AI Chat</span>
            {messages.length > 0 && <span className="w-2 h-2 rounded-full bg-violet-400" />}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIAssistant;
