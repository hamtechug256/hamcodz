'use client';

import { Navigation } from '@/components/portfolio/Navigation';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { WhatsAppButton } from '@/components/portfolio/WhatsAppButton';
import { Terminal } from '@/components/portfolio/Terminal';
import { MatrixRainCSS } from '@/components/portfolio/MatrixRain';
import { Scanlines } from '@/components/portfolio/GlitchEffects';
import { ParticleTrail, SparkleEffect } from '@/components/portfolio/ParticleTrail';
import { SoundEffects } from '@/components/portfolio/SoundEffects';
import { KeyboardNav } from '@/components/portfolio/KeyboardNav';
import { AIAssistant } from '@/components/portfolio/AIAssistant';
import { DemoChart } from '@/components/portfolio/DemoChart';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Matrix Rain Background */}
      <MatrixRainCSS opacity={0.04} />
      
      {/* Scanlines overlay */}
      <Scanlines />
      
      {/* Particle mouse trail */}
      <ParticleTrail color="#10b981" particleCount={2} trailLength={30} />
      
      {/* Sparkle on click */}
      <SparkleEffect />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Demo Chart Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm mb-2">
              <BarChart3 className="w-4 h-4" />
              <span>LIVE PREVIEW</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Market Analysis <span className="text-emerald-400">Demo</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Real-time simulated candlestick chart demonstrating price action analysis capabilities. 
              This is a demo only - no actual trading signals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DemoChart height={250} className="shadow-2xl shadow-emerald-500/10" />
          </motion.div>

          {/* Features row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
          >
            {[
              { icon: TrendingUp, title: 'Price Action', desc: 'Advanced chart pattern recognition' },
              { icon: BarChart3, title: 'Technical Analysis', desc: 'Multi-timeframe analysis tools' },
              { icon: TrendingUp, title: 'Algorithm Development', desc: 'Custom EA and indicator creation' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <feature.icon className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about">
        <About />
      </section>
      
      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>
      
      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>
      
      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
      
      {/* Footer */}
      <Footer />

      {/* Sound Effects System */}
      <SoundEffects />

      {/* Keyboard Navigation */}
      <KeyboardNav />

      {/* AI Chat Assistant */}
      <AIAssistant />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Interactive Terminal */}
      <Terminal />
    </main>
  );
}
