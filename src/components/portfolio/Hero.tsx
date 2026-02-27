'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Twitter, Send, Terminal, Shield, TrendingUp, Code, Cpu, Lock, Sparkles, MousePointer2 } from 'lucide-react';
import { FloatingParticles, GlowingOrb } from './AnimatedSection';

const roles = [
  { icon: Code, text: 'Full-Stack Developer', color: 'text-cyan-400' },
  { icon: Shield, text: 'Cybersecurity Expert', color: 'text-red-400' },
  { icon: TrendingUp, text: 'Forex Trader', color: 'text-emerald-400' },
  { icon: Cpu, text: 'EA Developer', color: 'text-violet-400' },
  { icon: Lock, text: 'Ethical Hacker', color: 'text-amber-400' },
];

export function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="hero-gradient-bg" />
      <div className="noise-overlay" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="cyber-lines" />
      </div>
      
      {/* Glowing Orbs */}
      <GlowingOrb className="w-[600px] h-[600px] -top-64 -left-64 opacity-30" color="emerald" />
      <GlowingOrb className="w-[500px] h-[500px] top-1/3 -right-64 opacity-25" color="violet" />
      <GlowingOrb className="w-[400px] h-[400px] bottom-0 left-1/4 opacity-20" color="cyan" />
      
      {/* Floating Particles */}
      <FloatingParticles count={80} />
      
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-[10%] text-emerald-500/20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <TrendingUp className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-[15%] text-violet-500/20"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Shield className="w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-[20%] text-cyan-500/20"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Code className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-[10%] text-amber-500/20"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Cpu className="w-14 h-14" />
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Glitch Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-emerald-500/30 bg-emerald-500/5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400 flex items-center gap-2">
                <span className="opacity-60">$</span> 
                <span>initializing portfolio...</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >_</motion.span>
              </span>
            </div>
          </motion.div>

          {/* Main Title - SINGLE LINE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tighter leading-none">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80">
                HAM
              </span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 animate-gradient-x">
                CODZ
              </span>
            </h1>
          </motion.div>

          {/* Animated Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-1 w-48 mx-auto mb-8 rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
          />

          {/* Animated Roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {roles.map((role, index) => (
              <motion.div
                key={role.text}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card border border-white/5 hover:border-white/20 transition-all cursor-default group"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <role.icon className={`w-4 h-4 ${role.color}`} />
                </motion.div>
                <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{role.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Building{' '}
            <span className="text-cyan-400 font-semibold">secure systems</span>, 
            crafting{' '}
            <span className="text-emerald-400 font-semibold">profitable algorithms</span>, 
            and{' '}
            <span className="text-violet-400 font-semibold">protecting digital assets</span>. 
            <br className="hidden md:block" />
            Where code meets security and strategy meets profit.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#projects');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 rounded-xl text-lg font-semibold overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-500 transition-all duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 text-black">
                <Sparkles className="w-5 h-5" />
                Explore My Work
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Get in Touch
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Twitter, href: 'https://twitter.com/hamcodz', label: 'Twitter', hoverColor: 'hover:bg-sky-500/20 hover:border-sky-500/50' },
              { icon: Github, href: 'https://github.com/hamcodz', label: 'GitHub', hoverColor: 'hover:bg-white/10' },
              { icon: Send, href: 'https://t.me/hamcodz', label: 'Telegram', hoverColor: 'hover:bg-blue-500/20 hover:border-blue-500/50' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 rounded-xl glass-card flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 ${social.hoverColor}`}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-3 text-white/40 hover:text-white/70 transition-colors group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 text-sm font-mono">
            <MousePointer2 className="w-4 h-4" />
            <span>scroll</span>
          </div>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-current"
            />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
