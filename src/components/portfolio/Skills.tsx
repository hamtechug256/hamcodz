'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { 
  Code, Shield, TrendingUp, Cpu, Bug, Server,
  Terminal
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Development',
    icon: Code,
    gradient: 'from-cyan-400 to-blue-500',
    skills: [
      { name: 'JavaScript / TypeScript', level: 95 },
      { name: 'Python', level: 92 },
      { name: 'React / Next.js', level: 90 },
      { name: 'Node.js', level: 88 },
      { name: 'MQL4 / MQL5', level: 85 },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    gradient: 'from-red-400 to-rose-500',
    skills: [
      { name: 'Penetration Testing', level: 90 },
      { name: 'Vulnerability Assessment', level: 92 },
      { name: 'Network Security', level: 88 },
      { name: 'OWASP Top 10', level: 95 },
      { name: 'Incident Response', level: 82 },
    ],
  },
  {
    title: 'Forex Trading',
    icon: TrendingUp,
    gradient: 'from-emerald-400 to-teal-500',
    skills: [
      { name: 'ICT Concepts', level: 95 },
      { name: 'Technical Analysis', level: 92 },
      { name: 'Risk Management', level: 90 },
      { name: 'Price Action', level: 93 },
      { name: 'Algorithmic Trading', level: 88 },
    ],
  },
  {
    title: 'EA Development',
    icon: Cpu,
    gradient: 'from-violet-400 to-purple-500',
    skills: [
      { name: 'MQL5 Programming', level: 92 },
      { name: 'MQL4 Programming', level: 90 },
      { name: 'Strategy Automation', level: 88 },
      { name: 'Backtesting Systems', level: 85 },
      { name: 'Optimization', level: 87 },
    ],
  },
  {
    title: 'Ethical Hacking',
    icon: Bug,
    gradient: 'from-amber-400 to-orange-500',
    skills: [
      { name: 'Web App Security', level: 92 },
      { name: 'OSINT', level: 88 },
      { name: 'Exploit Development', level: 80 },
      { name: 'Password Cracking', level: 85 },
      { name: 'Wireless Security', level: 78 },
    ],
  },
  {
    title: 'IT Infrastructure',
    icon: Server,
    gradient: 'from-sky-400 to-indigo-500',
    skills: [
      { name: 'Linux Administration', level: 90 },
      { name: 'Cloud Services (AWS)', level: 85 },
      { name: 'Docker / Kubernetes', level: 82 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Network Architecture', level: 88 },
    ],
  },
];

const tools = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Kali Linux', 'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'OWASP ZAP',
  'MetaTrader 4/5', 'TradingView', 'Docker', 'AWS', 'Git', 'Linux'
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-violet-500/20 mb-6"
            >
              <Terminal className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-mono text-violet-400">ls ./skills</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white/90">Technical</span>
              <br />
              <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              A comprehensive toolkit spanning development, security, and trading.
            </p>
          </AnimatedSection>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, catIndex) => (
              <AnimatedSection key={category.title} delay={catIndex * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors h-full group"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                      <p className="text-xs text-white/40">{category.skills.length} skills</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    {category.skills.map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/80 font-medium">{skill.name}</span>
                          <span className="text-white/40 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                            viewport={{ once: true }}
                            className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Tools Marquee */}
          <AnimatedSection delay={0.4}>
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4 text-center">
                Tools & Technologies
              </h3>
              <div className="overflow-hidden relative">
                <div className="flex gap-3 animate-marquee">
                  {[...tools, ...tools].map((tool, index) => (
                    <span
                      key={index}
                      className="flex-shrink-0 px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/5 text-white/70 hover:border-emerald-500/30 hover:text-white transition-colors cursor-default whitespace-nowrap"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
