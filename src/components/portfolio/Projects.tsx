'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Github, 
  TrendingUp, 
  BarChart3, 
  Gauge,
  Shield,
  Cpu,
  Bug,
  Code,
  X,
  ChevronRight,
  Target,
  Terminal,
  ArrowUpRight
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'EURUSD Monday Range Strategy',
    category: 'Trading',
    description: 'ICT-based algorithmic trading strategy capitalizing on Monday range expansion.',
    longDescription: 'This sophisticated trading strategy leverages key ICT concepts including Order Blocks, Fair Value Gaps, and liquidity sweeps to identify high-probability trading opportunities. Built with extensive backtesting and optimized for EURUSD.',
    icon: TrendingUp,
    tags: ['ICT', 'EURUSD', 'Algo Trading', 'Backtesting'],
    metrics: [
      { label: 'Win Rate', value: '76%' },
      { label: 'R:R Ratio', value: '1:2.5' },
      { label: 'Tested', value: '12mo' },
    ],
    features: [
      'Automated Monday range detection',
      'Smart liquidity sweep identification',
      'Dynamic stop-loss placement',
      'Multi-session analysis',
    ],
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
    github: 'https://github.com/hamtechug256',
  },
  {
    id: 2,
    title: 'Hamcodz EA Framework',
    category: 'EA Development',
    description: 'MQL5 framework for building robust Expert Advisors with built-in risk management.',
    longDescription: 'A modular Expert Advisor framework that simplifies the development of automated trading systems. Includes advanced money management, trailing stops, and a flexible signal system.',
    icon: Cpu,
    tags: ['MQL5', 'MetaTrader', 'Automation', 'Risk'],
    metrics: [
      { label: 'EAs Built', value: '15+' },
      { label: 'Strategies', value: '20+' },
      { label: 'Code Lines', value: '10K+' },
    ],
    features: [
      'Modular architecture',
      'Built-in risk calculator',
      'Multi-currency support',
      'Advanced trailing stops',
    ],
    color: 'violet',
    gradient: 'from-violet-400 to-purple-500',
    github: 'https://github.com/hamtechug256',
  },
  {
    id: 3,
    title: 'Security Audit Toolkit',
    category: 'Cybersecurity',
    description: 'Comprehensive toolkit for web application security testing and vulnerability assessment.',
    longDescription: 'An integrated security testing suite combining automated scanning with manual testing capabilities. Covers OWASP Top 10 vulnerabilities and includes custom scripts for advanced penetration testing.',
    icon: Shield,
    tags: ['Python', 'Security', 'Pentest', 'OWASP'],
    metrics: [
      { label: 'Vulns Found', value: '200+' },
      { label: 'Tools', value: '15' },
      { label: 'Audits', value: '100+' },
    ],
    features: [
      'Automated vulnerability scanning',
      'Custom exploit development',
      'Detailed reporting system',
      'CI/CD integration',
    ],
    color: 'red',
    gradient: 'from-red-400 to-rose-500',
    github: 'https://github.com/hamtechug256',
  },
  {
    id: 4,
    title: 'Trading Backtesting Engine',
    category: 'Development',
    description: 'High-performance Python backtesting engine with tick-level data processing.',
    longDescription: 'Built from scratch to handle tick-level data processing, this engine provides comprehensive strategy validation with Monte Carlo simulations and walk-forward analysis.',
    icon: BarChart3,
    tags: ['Python', 'Pandas', 'Backtest', 'Data'],
    metrics: [
      { label: 'Strategies', value: '100+' },
      { label: 'Data Points', value: '10M+' },
      { label: 'Speed', value: '<1s' },
    ],
    features: [
      'Tick-level data processing',
      'Monte Carlo simulation',
      'Walk-forward optimization',
      'Custom metrics',
    ],
    color: 'amber',
    gradient: 'from-amber-400 to-orange-500',
    github: 'https://github.com/hamtechug256',
  },
  {
    id: 5,
    title: 'Network Intrusion Detector',
    category: 'Ethical Hacking',
    description: 'Real-time network monitoring with ML-based anomaly detection and alerting.',
    longDescription: 'A sophisticated network security monitoring solution using machine learning to detect anomalies and potential intrusions in real-time. Includes packet capture and automated response.',
    icon: Bug,
    tags: ['Python', 'ML', 'Network', 'Security'],
    metrics: [
      { label: 'Detection', value: '98%' },
      { label: 'False +', value: '<2%' },
      { label: 'Response', value: '<100ms' },
    ],
    features: [
      'Real-time packet analysis',
      'ML anomaly detection',
      'Automated threat response',
      'Comprehensive logging',
    ],
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    github: 'https://github.com/hamtechug256',
  },
  {
    id: 6,
    title: 'Hamcodz Analytics Dashboard',
    category: 'Full-Stack',
    description: 'Real-time market analysis dashboard with live charts and trading signals.',
    longDescription: 'A comprehensive web-based dashboard aggregating market data, displaying real-time technical analysis, and providing actionable trading signals with multi-timeframe analysis.',
    icon: Gauge,
    tags: ['React', 'Next.js', 'Charts', 'Real-time'],
    metrics: [
      { label: 'Instruments', value: '50+' },
      { label: 'Indicators', value: '25+' },
      { label: 'Latency', value: '<100ms' },
    ],
    features: [
      'Real-time data streaming',
      'Multi-timeframe analysis',
      'Custom indicator builder',
      'Alert notifications',
    ],
    color: 'blue',
    gradient: 'from-blue-400 to-indigo-500',
    github: 'https://github.com/hamtechug256',
  },
];

const categories = ['All', 'Trading', 'EA Development', 'Cybersecurity', 'Development', 'Ethical Hacking', 'Full-Stack'];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/20 mb-6"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400">ls ./projects</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white/90">Featured</span>
              <br />
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Trading systems, security tools, and development projects.
            </p>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection delay={0.2} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/25'
                      : 'glass-card text-white/60 hover:text-white border border-white/5'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-colors h-full">
                    {/* Project Visual */}
                    <div className={`relative h-44 bg-gradient-to-br ${project.gradient} p-6 flex items-center justify-center overflow-hidden`}>
                      <project.icon className="w-20 h-20 text-black/15" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/30 text-white border-0 text-xs backdrop-blur-sm">
                          {project.category}
                        </Badge>
                      </div>
                      
                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/50 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/5 text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            >
              {/* Header Gradient */}
              <div className={`h-1.5 bg-gradient-to-r ${selectedProject.gradient}`} />
              
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center flex-shrink-0`}>
                    <selectedProject.icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs border-white/20 text-white/60">{selectedProject.category}</Badge>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 mb-8 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {selectedProject.metrics.map((metric) => (
                    <div key={metric.label} className="glass-card rounded-xl p-4 text-center border border-white/5">
                      <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                      <div className="text-xs text-white/40 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/5 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-white/60 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {selectedProject.github && (
                    <Button variant="outline" className="btn-outline" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {selectedProject.demo && (
                    <Button className="btn-primary" asChild>
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
