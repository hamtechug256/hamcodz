'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, Counter } from './AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, Code, Target, Award, Shield, Cpu, Bug, 
  Lock, Globe, Zap, Brain, Terminal, MapPin
} from 'lucide-react';

const stats = [
  { 
    icon: Code, 
    value: 50, 
    suffix: '+', 
    label: 'Projects Delivered', 
    gradient: 'from-cyan-400 to-blue-500'
  },
  { 
    icon: Shield, 
    value: 100, 
    suffix: '+', 
    label: 'Security Audits', 
    gradient: 'from-red-400 to-rose-500'
  },
  { 
    icon: TrendingUp, 
    value: 76, 
    suffix: '%', 
    label: 'Trading Win Rate', 
    gradient: 'from-emerald-400 to-teal-500'
  },
  { 
    icon: Cpu, 
    value: 15, 
    suffix: '+', 
    label: 'EAs Developed', 
    gradient: 'from-violet-400 to-purple-500'
  },
];

const expertise = [
  { title: 'Full-Stack Development', icon: Code, description: 'Modern web apps, APIs, and automation tools', color: 'cyan' },
  { title: 'Cybersecurity', icon: Shield, description: 'Penetration testing, security audits, threat analysis', color: 'red' },
  { title: 'Forex Trading', icon: TrendingUp, description: 'ICT concepts, algorithmic strategies, risk management', color: 'emerald' },
  { title: 'EA Development', icon: Cpu, description: 'MQL4/5 Expert Advisors and automated trading systems', color: 'violet' },
  { title: 'Ethical Hacking', icon: Bug, description: 'Vulnerability assessment and security research', color: 'amber' },
  { title: 'IT Solutions', icon: Globe, description: 'System architecture, networking, cloud infrastructure', color: 'blue' },
];

const techStack = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'MQL4/5', 'SQL', 'Bash'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Express'] },
  { category: 'Security', items: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap'] },
  { category: 'Trading', items: ['MetaTrader 4/5', 'TradingView', 'Python Backtesting'] },
];

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/20 mb-6"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">cat about.txt</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white/90">Multi-Disciplinary</span>
              <br />
              <span className="gradient-text">Technologist</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Bridging development, security, and financial markets with precision.
            </p>
          </AnimatedSection>

          {/* Stats Row */}
          <AnimatedSection delay={0.2} className="mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                  />
                  <div className="relative glass-card rounded-2xl p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-black" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Bio Section */}
          <div className="grid lg:grid-cols-5 gap-10 mb-20">
            <AnimatedSection direction="left" className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-8 border border-white/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs font-mono text-white/40">about.txt</span>
                </div>
                
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    I'm <span className="text-cyan-400 font-semibold">Hamcodz</span> — a multidisciplinary technologist 
                    with expertise spanning <span className="text-cyan-400">software development</span>, 
                    <span className="text-red-400"> cybersecurity</span>, and 
                    <span className="text-emerald-400"> algorithmic trading</span>.
                  </p>
                  <p>
                    With years of hands-on experience, I've built secure web applications, conducted penetration tests, 
                    developed profitable trading algorithms, and created Expert Advisors (EAs) that automate strategies 
                    in the forex market.
                  </p>
                  <p>
                    My approach combines technical precision with strategic thinking — whether I'm hunting bugs in code, 
                    hunting liquidity in markets, or building the next automated trading system.
                  </p>
                </div>

                {/* Location Badge */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-400">Kampala, Uganda 🇺🇬</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-white/70">Available for work</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-2">
              <div className="space-y-4 h-full">
                {/* Expertise Cards */}
                {expertise.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    className="glass-card rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-${item.color}-500/10 flex items-center justify-center`}>
                        <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-white/40">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Tech Stack */}
          <AnimatedSection delay={0.4}>
            <div className="glass-card rounded-3xl p-8 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-400" />
                Tech Stack
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {techStack.map((tech) => (
                  <div key={tech.category}>
                    <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">{tech.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/5 text-white/70 hover:border-emerald-500/30 hover:text-white transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Philosophy */}
          <AnimatedSection delay={0.6} className="mt-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-violet-500/10 rounded-3xl blur-3xl" />
              <div className="relative glass-card rounded-3xl p-10 md:p-14 text-center border border-white/5">
                <Brain className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">Philosophy</h3>
                <blockquote className="text-lg md:text-xl text-white/60 italic max-w-3xl mx-auto leading-relaxed">
                  "In a world of increasing digital threats and market volatility, I believe in building{' '}
                  <span className="text-cyan-400 not-italic font-medium">robust systems</span>,{' '}
                  <span className="text-red-400 not-italic font-medium">secure architectures</span>, and{' '}
                  <span className="text-emerald-400 not-italic font-medium">profitable strategies</span>. 
                  The intersection of these disciplines is where innovation happens."
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
